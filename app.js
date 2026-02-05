import { CARDS } from './cards.js';
import { db } from './firebase-config.js';

// Application State
const state = {
    playerName: '',
    deck: [],
    selectedEnergies: [],
    currentRoom: null,
    playerRole: null, // 'p1' or 'p2'
};

// Screen Management
const screens = {
    title: document.getElementById('title-screen'),
    deckBuilder: document.getElementById('deck-builder'),
    matchmaking: document.getElementById('matchmaking'),
    battle: document.getElementById('battle-screen')
};

function showScreen(screenId) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[screenId].classList.remove('hidden');
}

// ===== TITLE SCREEN =====
document.getElementById('start-btn').addEventListener('click', () => {
    const name = document.getElementById('player-name').value.trim();
    if (!name) {
        alert('プレイヤー名を入力してください');
        return;
    }
    state.playerName = name;
    initDeckBuilder();
    showScreen('deckBuilder');
});

// ===== DECK BUILDER =====
function initDeckBuilder() {
    const energyOptions = document.getElementById('energy-options');
    const types = ['Fire', 'Water', 'Grass', 'Lightning', 'Fighting', 'Metal', 'Psychic', 'Darkness', 'Dragon'];

    energyOptions.innerHTML = '';
    types.forEach(type => {
        const chip = document.createElement('div');
        chip.className = `energy-chip ${type}`;
        chip.textContent = type;
        chip.addEventListener('click', () => toggleEnergy(type, chip));
        energyOptions.appendChild(chip);
    });

    renderCardList();
    renderCurrentDeck();
}

function toggleEnergy(type, element) {
    if (state.selectedEnergies.includes(type)) {
        state.selectedEnergies = state.selectedEnergies.filter(t => t !== type);
        element.classList.remove('selected');
    } else {
        if (state.selectedEnergies.length >= 3) {
            alert('エネルギーは最大3つまで選択できます');
            return;
        }
        state.selectedEnergies.push(type);
        element.classList.add('selected');
    }
    validateDeck();
}

function renderCardList() {
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = '';

    CARDS.forEach(card => {
        const cardEl = createCardElement(card);
        cardEl.addEventListener('click', () => addToDeck(card));
        cardList.appendChild(cardEl);
    });
}

function createCardElement(card) {
    const el = document.createElement('div');
    el.className = 'card';
    if (card.isEx) el.classList.add('ex');

    const movesHTML = card.moves ? card.moves.map(m =>
        `<div style="font-size: 0.8rem; margin: 0.25rem 0; border-bottom: 1px dashed rgba(255,255,255,0.2);">
      <div style="font-weight:bold;">${m.name}</div>
      <div style="display:flex; justify-content:space-between;">
        <span>${m.cost ? m.cost.map(c => c[0]).join('') : ''}</span>
        <span>${m.damage || 0}</span>
      </div>
    </div>`
    ).join('') : '';

    el.innerHTML = `
    <div class="hp">${card.hp} HP</div>
    <div class="name">${card.name}</div>
    <div class="stage">${card.stage}</div>
    <div class="moves-container" style="margin-top:5px;">${movesHTML}</div>
    <div style="font-size: 0.75rem; color: #aaa; margin-top: 0.5rem;">${card.type}</div>
  `;
    return el;
}

function addToDeck(card) {
    if (state.deck.length >= 20) {
        alert('デッキは20枚固定です');
        return;
    }

    // Check duplicate limit (max 2)
    const existingCount = state.deck.filter(c => c.id === card.id).length;
    if (existingCount >= 2) {
        alert('同じカードは2枚までしか入れられません');
        return;
    }

    state.deck.push({ ...card, instanceId: Date.now() + Math.random() });
    renderCurrentDeck();
    validateDeck();
}

function removeFromDeck(index) {
    state.deck.splice(index, 1);
    renderCurrentDeck();
    validateDeck();
}

function renderCurrentDeck() {
    const deckList = document.getElementById('deck-list');
    const countEl = document.getElementById('card-count');

    deckList.innerHTML = '';
    state.deck.forEach((card, index) => {
        const cardEl = createCardElement(card);
        cardEl.addEventListener('click', () => removeFromDeck(index));
        cardEl.style.cursor = 'pointer';
        cardEl.title = 'クリックで削除';
        deckList.appendChild(cardEl);
    });

    countEl.textContent = `${state.deck.length} / 20`;
}

function validateDeck() {
    const btn = document.getElementById('to-matchmaking-btn');
    const hasBasic = state.deck.some(c => c.stage === 'Basic');
    const isValid = state.deck.length === 20 && state.selectedEnergies.length > 0 && hasBasic;
    btn.disabled = !isValid;

    if (state.deck.length === 20 && !hasBasic) {
        console.warn('デッキには最低1枚のたねポケモン (Basic) が必要です');
    }
}

document.getElementById('to-matchmaking-btn').addEventListener('click', () => {
    showScreen('matchmaking');
});

// ===== MATCHMAKING =====
document.getElementById('host-btn').addEventListener('click', async () => {
    const roomID = document.getElementById('room-id').value.trim();
    if (!roomID) {
        alert('合言葉を入力してください');
        return;
    }
    await joinRoom(roomID);
});

async function joinRoom(roomID) {
    state.currentRoom = roomID;
    const roomRef = db.ref(`rooms/${roomID}`);
    const snapshot = await roomRef.once('value');
    const roomData = snapshot.val();

    if (!roomData || !roomData.p1 || roomData.phase === 'ended') {
        // Create room as P1
        state.playerRole = 'p1';
        await roomRef.set({
            p1: {
                name: state.playerName,
                deck: state.deck,
                energies: state.selectedEnergies,
                ready: false,
                score: 0
            },
            p2: null,
            phase: 'waiting',
            currentTurn: null,
            coinResult: null,
            winner: null
        });
    } else if (!roomData.p2) {
        // Join room as P2
        state.playerRole = 'p2';
        await roomRef.child('p2').set({
            name: state.playerName,
            deck: state.deck,
            energies: state.selectedEnergies,
            ready: false,
            score: 0
        });
        await roomRef.child('phase').set('setup');
    } else {
        alert('この部屋は満員です');
        return;
    }

    document.getElementById('waiting-message').classList.remove('hidden');

    // Listen for both players ready
    const listener = roomRef.on('value', (snap) => {
        const data = snap.val();
        if (data && data.p1 && data.p2 && data.phase !== 'waiting') {
            roomRef.off('value', listener);
            startBattle(data);
        }
    });
}

function startBattle(roomData) {
    console.log('Battle starting with data:', roomData);
    showScreen('battle');
    // Initialize Game Engine
    import('./game.js').then(module => {
        module.initBattle(state.currentRoom, state.playerRole, roomData);
    });
}
