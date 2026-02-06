import { db } from './firebase-config.js';
import { CARDS } from './cards.js';

// Game State
let roomID = null;
let playerRole = null; // 'p1' or 'p2'
let oppRole = null;
let gameState = null;
let roomRef = null;
let turnsSinceFieldEntry = {}; // Track turns for evolution

// Initialize Battle
export function initBattle(id, role, initialData) {
    roomID = id;
    playerRole = role;
    oppRole = role === 'p1' ? 'p2' : 'p1';
    roomRef = db.ref(`rooms/${roomID}`);

    // Listen to game state changes
    roomRef.on('value', (snapshot) => {
        gameState = snapshot.val();
        if (gameState) {
            updateUI();
            handlePhase();
        }
    });

    // Listen to logs
    roomRef.child('logs').on('child_added', (snapshot) => {
        const log = snapshot.val();
        if (log) {
            renderLog(log.type, log.message);
        }
    });

    // Initialize game if P1
    if (playerRole === 'p1') {
        initializeGame(initialData);
    }
}

function initializeGame(roomData) {
    // Coin toss
    const coinResult = Math.random() < 0.5 ? 'p1' : 'p2';
    const firstPlayer = coinResult;

    // Shuffle and draw initial hands
    const p1Deck = shuffle([...roomData.p1.deck]);
    const p2Deck = shuffle([...roomData.p2.deck]);

    const p1Hand = drawWithMulligan(p1Deck);
    const p2Hand = drawWithMulligan(p2Deck);

    roomRef.update({
        coinResult: firstPlayer,
        currentTurn: firstPlayer,
        phase: 'setup',
        p1: {
            ...roomData.p1,
            deck: p1Deck,
            hand: p1Hand,
            active: null,
            bench: [null, null, null],
            discard: [],
            energyZone: [],
            setupReady: false,
            hasAttachedEnergy: false,
            hasAttacked: false
        },
        p2: {
            ...roomData.p2,
            deck: p2Deck,
            hand: p2Hand,
            active: null,
            bench: [null, null, null],
            discard: [],
            energyZone: [],
            setupReady: false,
            hasAttachedEnergy: false,
            hasAttacked: false
        }
    });

    addLog('system', `コイントス結果: ${firstPlayer === 'p1' ? roomData.p1.name : roomData.p2.name} が先攻!`);
    addLog('system', 'セットアップフェーズ: たねポケモンをバトル場に出してください');
}

// Utility Functions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawWithMulligan(deck) {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const hand = deck.splice(0, 5);
        const hasBasic = hand.some(c => c.stage === 'Basic');

        if (hasBasic) {
            return hand;
        }

        // Mulligan: shuffle back and redraw
        deck.push(...hand);
        shuffle(deck);
        attempts++;
    }

    // Safety: return whatever we have
    return deck.splice(0, 5);
}

// Helper function to convert Firebase objects/arrays to proper arrays
function toArray(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // Firebase converts arrays with nulls to objects, convert back
    return Object.values(data).filter(v => v !== null && v !== undefined);
}

// UI Update
function updateUI() {
    if (!gameState) return;

    const player = gameState[playerRole];
    const opponent = gameState[oppRole];

    if (!player || !opponent) return;

    // Update scores
    document.getElementById('player-score').textContent = player.score || 0;
    document.getElementById('opponent-score').textContent = opponent.score || 0;

    // Update active Pokemon
    renderPokemon('player-active', player.active);
    renderPokemon('opponent-active', opponent.active);

    // Convert bench to array if needed (Firebase converts arrays with nulls to objects)
    const playerBench = Array.isArray(player.bench) ? player.bench : [player.bench?.[0] || null, player.bench?.[1] || null, player.bench?.[2] || null];
    const opponentBench = Array.isArray(opponent.bench) ? opponent.bench : [opponent.bench?.[0] || null, opponent.bench?.[1] || null, opponent.bench?.[2] || null];

    // Update bench
    for (let i = 0; i < 3; i++) {
        renderPokemon(`player-bench-${i}`, playerBench[i]);
        renderPokemon(`opponent-bench-${i}`, opponentBench[i]);
    }

    // Update hand
    renderHand(player.hand || []);

    // Update energy zone
    renderEnergyZone(player.energyZone || []);

    // Update opponent hand count
    document.getElementById('opponent-hand-count').textContent = (opponent.hand || []).length;

    // Update turn indicator
    const isMyTurn = gameState.currentTurn === playerRole;
    const turnText = isMyTurn ? 'あなたのターン' : '相手のターン';
    document.getElementById('turn-indicator').textContent = turnText;
    document.getElementById('turn-indicator').style.color = isMyTurn ? '#06ffa5' : '#ff006e';
}

function renderPokemon(containerId, pokemon) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (!pokemon) {
        const label = containerId.includes('active') ? 'バトル場' : 'ベンチ';
        container.innerHTML = `<span style="opacity: 0.3;">${label}</span>`;
        return;
    }

    // Mask opponent's Pokemon during setup
    if (gameState.phase === 'setup' && containerId.startsWith('opponent')) {
        const hasPokemon = !!pokemon;
        container.innerHTML = hasPokemon ?
            `<div class="card-back" style="background: #333; height: 100%; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #555;">(Hidden)</div>`
            : `<span style="opacity: 0.3;">ベンチ</span>`;
        return;
    }

    const card = document.createElement('div');
    card.className = 'pokemon-card';
    if (pokemon.isEx) card.classList.add('ex');

    const hpPercent = (pokemon.currentHp / pokemon.hp) * 100;

    const energyIcons = (pokemon.attachedEnergy || []).map(e =>
        `<div class="energy-icon ${e}" style="background: ${getEnergyColor(e)};"></div>`
    ).join('');

    const statusHTML = pokemon.status ?
        `<span class="status-indicator ${pokemon.status}">${pokemon.status}</span>` : '';

    // Show moves only for Active Pokemon
    let movesHTML = '';
    if (containerId.includes('active') && pokemon.moves) {
        movesHTML = '<div class="active-moves" style="margin-top:5px; font-size:0.75rem;">' +
            pokemon.moves.map(m =>
                `<div>${m.name} (${m.damage || 0}) <small>${m.cost ? m.cost.map(c => c[0]).join('') : ''}</small></div>`
            ).join('') +
            '</div>';
    }

    card.innerHTML = `
    <div class="name">${pokemon.name} ${statusHTML}</div>
    <div class="hp-bar">
      <div class="hp-fill" style="width: ${hpPercent}%;"></div>
    </div>
    <div style="font-size: 0.8rem;">${pokemon.currentHp} / ${pokemon.hp} HP</div>
    <div class="energy-icons">${energyIcons}</div>
    ${movesHTML}
  `;

    // Make clickable for player's Pokemon
    if (containerId.startsWith('player')) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => handlePokemonClick(pokemon, containerId));
    }

    container.appendChild(card);
}

function renderHand(hand) {
    const container = document.getElementById('player-hand');
    container.innerHTML = '';

    hand.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'hand-card';
        if (card.isEx) cardEl.classList.add('ex');

        const movesHTML = card.moves ? card.moves.map(m =>
            `<div style="font-size: 0.7rem; margin: 2px 0; border-top: 1px dashed rgba(255,255,255,0.2); padding-top:2px;">
               <span style="font-weight:bold;">${m.name}</span>
               <span style="float:right;">${m.damage || 0}</span>
               <div style="font-size:0.65rem; color:#ccc;">${m.cost ? m.cost.map(c => c[0]).join('') : ''}</div>
             </div>`
        ).join('') : '';

        cardEl.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 0.2rem; font-size: 0.9rem;">${card.name}</div>
      <div style="font-size: 0.75rem; color: #aaa;">${card.stage} | ${card.hp} HP</div>
      <div style="margin-top:0.3rem;">${movesHTML}</div>
    `;

        cardEl.addEventListener('click', () => handleHandCardClick(card, index));
        container.appendChild(cardEl);
    });
}

function renderEnergyZone(energies) {
    const container = document.getElementById('player-energy');
    container.innerHTML = '';

    energies.forEach((energy, index) => {
        const token = document.createElement('div');
        token.className = 'energy-token';
        token.style.color = getEnergyColor(energy);
        token.textContent = energy.substring(0, 1);
        token.title = energy;
        token.addEventListener('click', () => handleEnergyClick(energy, index));
        container.appendChild(token);
    });
}

function getEnergyColor(type) {
    const colors = {
        Fire: '#ff6b35',
        Water: '#3a86ff',
        Grass: '#06ffa5',
        Lightning: '#ffbe0b',
        Fighting: '#d62828',
        Metal: '#8d99ae',
        Psychic: '#b5179e',
        Darkness: '#6c757d',
        Dragon: '#7209b7',
        Colorless: '#adb5bd'
    };
    return colors[type] || '#ffffff';
}

// Phase Handling
function handlePhase() {
    if (!gameState) return;

    const phase = gameState.phase;

    if (phase === 'setup') {
        handleSetupPhase();
    } else if (phase === 'battle') {
        handleBattlePhase();
    } else if (phase === 'switching') {
        handleSwitchingPhase();
    } else if (phase === 'ended') {
        handleGameEnd();
    }
}

function handleSetupPhase() {
    const player = gameState[playerRole];
    const readyBtn = document.getElementById('ready-btn');

    if (player.setupReady) {
        readyBtn.classList.add('hidden');
    } else {
        readyBtn.classList.remove('hidden');
        readyBtn.onclick = () => setupReady();
    }
}

function handleBattlePhase() {
    const isMyTurn = gameState.currentTurn === playerRole;
    const player = gameState[playerRole];

    document.getElementById('ready-btn').classList.add('hidden');
    document.getElementById('end-turn-btn').classList.toggle('hidden', !isMyTurn);
    document.getElementById('attack-btn').classList.toggle('hidden', !isMyTurn || player.hasAttacked);
    document.getElementById('retreat-btn').classList.toggle('hidden', !isMyTurn || !player.active);

    if (isMyTurn) {
        document.getElementById('end-turn-btn').onclick = () => endTurn();
        document.getElementById('attack-btn').onclick = () => initiateAttack();
        document.getElementById('retreat-btn').onclick = () => initiateRetreat();
    }
}

function handleSwitchingPhase() {
    // Do nothing here - messages are shown when entering switching phase
    // This function is called on every state update during switching phase
    // Adding logs here would create an infinite loop as addLog triggers state updates
}

function handleGameEnd() {
    const winner = gameState.winner;
    const winnerData = gameState[winner];
    addLog('system', `ゲーム終了! ${winnerData.name} の勝利!`);

    setTimeout(() => {
        if (confirm('デッキ構築画面に戻りますか?')) {
            location.reload();
        }
    }, 3000);
}

// Player Actions
function handleHandCardClick(card, index) {
    const phase = gameState.phase;
    const player = gameState[playerRole];

    if (phase === 'setup' && card.stage === 'Basic' && !player.setupReady) {
        // Place as active or bench during setup
        if (!player.active) {
            placeAsActive(card, index);
        } else {
            placeOnBench(card, index);
        }
    } else if (phase === 'battle' && gameState.currentTurn === playerRole) {
        if (card.stage !== 'Basic' && canEvolve(card)) {
            evolve(card, index);
        } else if (card.stage === 'Basic' && normalizeBench(player.bench).filter(b => b).length < 3) {
            placeOnBench(card, index);
        }
    }
}

function placeAsActive(card, handIndex) {
    const player = gameState[playerRole];
    const hand = toArray(player.hand);
    const pokemon = {
        ...hand[handIndex],
        currentHp: hand[handIndex].hp,
        attachedEnergy: [],
        status: null,
        turnsOnField: 0
    };
    hand.splice(handIndex, 1);

    roomRef.child(`${playerRole}/active`).set(pokemon);
    roomRef.child(`${playerRole}/hand`).set(hand);

    if (gameState.phase !== 'setup') {
        addLog('player', `${pokemon.name} をバトル場に出した`);
    }
}

// Helper function to normalize bench data to a proper 3-element array
function normalizeBench(bench) {
    if (!bench) return [null, null, null];

    let benchArray = [];
    if (Array.isArray(bench)) {
        benchArray = [...bench];
    } else {
        // Firebase may convert arrays with nulls to objects
        benchArray = [bench[0] || null, bench[1] || null, bench[2] || null];
    }

    // Ensure exactly 3 elements, replacing undefined with null
    while (benchArray.length < 3) benchArray.push(null);
    for (let i = 0; i < 3; i++) {
        if (benchArray[i] === undefined) benchArray[i] = null;
    }

    return benchArray;
}

function placeOnBench(card, handIndex) {
    const player = gameState[playerRole];
    const hand = toArray(player.hand);
    const benchArray = normalizeBench(player.bench);

    const emptyIndex = benchArray.findIndex(b => !b);
    if (emptyIndex === -1) {
        alert('ベンチがいっぱいです (最大3匹)');
        return;
    }

    if (card.stage !== 'Basic') {
        alert('ベンチに出せるのはたねポケモンのみです');
        return;
    }

    const pokemon = {
        ...hand[handIndex],
        currentHp: hand[handIndex].hp,
        attachedEnergy: [],
        status: null,
        turnsOnField: 0
    };

    hand.splice(handIndex, 1);
    benchArray[emptyIndex] = pokemon;

    roomRef.child(`${playerRole}/hand`).set(hand);
    roomRef.child(`${playerRole}/bench`).set(benchArray);

    if (gameState.phase !== 'setup') {
        addLog('player', `${pokemon.name} をベンチに出した`);
    }
}

function setupReady() {
    const player = gameState[playerRole];

    if (!player.active) {
        alert('バトル場にたねポケモンを出してください');
        return;
    }

    roomRef.child(`${playerRole}/setupReady`).set(true);

    // Check if both ready
    const opponent = gameState[oppRole];
    if (opponent.setupReady) {
        roomRef.update({ phase: 'battle' });
        startFirstTurn();
    }
}

function startFirstTurn() {
    const firstPlayer = gameState.currentTurn;
    const player = gameState[playerRole];
    const opponent = gameState[oppRole];

    addLog('system', `バトル開始!`);
    addLog('system', `${gameState[firstPlayer].name} のターン`);

    generateEnergy(firstPlayer);
    drawCard(firstPlayer);
}

// Turn Management
function drawCard(role) {
    const player = gameState[role];
    const deck = toArray(player.deck);
    if (deck.length === 0) return;

    const hand = toArray(player.hand);
    const card = deck.shift();
    hand.push(card);

    roomRef.child(`${role}/deck`).set(deck);
    roomRef.child(`${role}/hand`).set(hand);

    if (role === playerRole) {
        addLog('system', 'カードを1枚ドローした');
    }
}

function generateEnergy(role) {
    const player = gameState[role];
    const energyTypes = player.energies;
    const randomType = energyTypes[Math.floor(Math.random() * energyTypes.length)];

    const energyZone = [...(player.energyZone || [])];
    energyZone.push(randomType);

    roomRef.child(`${role}/energyZone`).set(energyZone);

    if (role === playerRole) {
        addLog('system', `${randomType} エネルギーが発生した`);
    }
}

function handleEnergyClick(energy, index) {
    if (gameState.currentTurn !== playerRole) return;
    if (gameState.phase !== 'battle') return;

    const player = gameState[playerRole];
    if (player.hasAttachedEnergy) {
        alert('ターンに1回しかエネルギーをつけられません');
        return;
    }

    // Select Pokemon to attach to
    const target = prompt('エネルギーをつける先を選んでください\n0: バトル場\n1-3: ベンチ (1,2,3)');

    if (target === null) return;

    const targetNum = parseInt(target);
    let targetPokemon = null;
    let targetPath = '';
    const bench = normalizeBench(player.bench);

    if (targetNum === 0) {
        targetPokemon = player.active;
        targetPath = `${playerRole}/active`;
    } else if (targetNum >= 1 && targetNum <= 3) {
        targetPokemon = bench[targetNum - 1];
        targetPath = `${playerRole}/bench/${targetNum - 1}`;
    }

    if (!targetPokemon) {
        alert('そこにはポケモンがいません');
        return;
    }

    const energyZone = toArray(player.energyZone);
    energyZone.splice(index, 1);

    const attachedEnergy = [...(targetPokemon.attachedEnergy || [])];
    attachedEnergy.push(energy);

    roomRef.child(`${playerRole}/energyZone`).set(energyZone);
    roomRef.child(`${targetPath}/attachedEnergy`).set(attachedEnergy);
    roomRef.child(`${playerRole}/hasAttachedEnergy`).set(true);

    addLog('player', `${targetPokemon.name} に ${energy} エネルギーをつけた`);
}

function canEvolve(evolutionCard) {
    const player = gameState[playerRole];
    const bench = normalizeBench(player.bench);

    // Check active
    if (player.active && player.active.name === evolutionCard.evolutionFrom && player.active.turnsOnField >= 1) {
        return true;
    }

    // Check bench
    for (let i = 0; i < bench.length; i++) {
        const pokemon = bench[i];
        if (pokemon && pokemon.name === evolutionCard.evolutionFrom && pokemon.turnsOnField >= 1) {
            return true;
        }
    }

    return false;
}

function evolve(evolutionCard, handIndex) {
    const player = gameState[playerRole];
    const hand = toArray(player.hand);
    const bench = normalizeBench(player.bench);

    // Find target
    let targetPath = '';
    let targetPokemon = null;

    if (player.active && player.active.name === evolutionCard.evolutionFrom && player.active.turnsOnField >= 1) {
        targetPath = `${playerRole}/active`;
        targetPokemon = player.active;
    } else {
        for (let i = 0; i < bench.length; i++) {
            if (bench[i] && bench[i].name === evolutionCard.evolutionFrom && bench[i].turnsOnField >= 1) {
                targetPath = `${playerRole}/bench/${i}`;
                targetPokemon = player.bench[i];
                break;
            }
        }
    }

    if (!targetPokemon) {
        // Find best guess for error message
        const potentialTarget = player.active && player.active.name === evolutionCard.evolutionFrom ? player.active :
            normalizeBench(player.bench).find(b => b && b.name === evolutionCard.evolutionFrom);

        let msg = '進化できるポケモンがいません(場に1ターン以上必要)';
        if (potentialTarget) {
            msg += `\n対象: ${potentialTarget.name}, 経過ターン: ${potentialTarget.turnsOnField || 0}`;
        }
        alert(msg);
        return;
    }

    // Evolve
    const evolved = {
        ...evolutionCard,
        currentHp: targetPokemon.currentHp + (evolutionCard.hp - targetPokemon.hp), // Keep damage
        attachedEnergy: targetPokemon.attachedEnergy || [],
        status: targetPokemon.status || null,
        turnsOnField: 0 // Reset turn counter on evolution
    };

    if (evolved.currentHp > evolved.hp) evolved.currentHp = evolved.hp;

    hand.splice(handIndex, 1);

    roomRef.child(targetPath).set(evolved);
    roomRef.child(`${playerRole}/hand`).set(hand);

    addLog('player', `${targetPokemon.name} を ${evolved.name} に進化させた`);
}

function initiateAttack() {
    const player = gameState[playerRole];

    if (!player.active) {
        alert('バトル場にポケモンがいません');
        return;
    }

    const active = player.active;

    if (!active.moves || active.moves.length === 0) {
        alert('この技ポケモンは技を持っていません');
        return;
    }

    // Show move selection
    let moveText = '使用する技を選んでください:\n';
    active.moves.forEach((move, i) => {
        const costText = move.cost ? move.cost.join(', ') : 'なし';
        moveText += `${i}: ${costText} - ${move.damage || 0}ダメージ\n`;
    });

    const choice = prompt(moveText);
    if (choice === null) return;

    const moveIndex = parseInt(choice);
    if (moveIndex < 0 || moveIndex >= active.moves.length) {
        alert('無効な選択です');
        return;
    }

    const move = active.moves[moveIndex];

    // Check if can pay cost
    if (!canPayCost(active.attachedEnergy, move.cost)) {
        alert('エネルギーが足りません');
        return;
    }

    performAttack(move);
}

function canPayCost(attached, cost) {
    if (!cost || cost.length === 0) return true;

    const attachedCopy = [...attached];

    for (const required of cost) {
        if (required === 'Colorless') {
            // Any energy works
            if (attachedCopy.length > 0) {
                attachedCopy.shift();
            } else {
                return false;
            }
        } else {
            const index = attachedCopy.indexOf(required);
            if (index !== -1) {
                attachedCopy.splice(index, 1);
            } else {
                return false;
            }
        }
    }

    return true;
}

function performAttack(move) {
    const player = gameState[playerRole];
    const opponent = gameState[oppRole];
    const attacker = player.active;
    const defender = opponent.active;

    if (!defender) {
        alert('相手のバトル場にポケモンがいません');
        return;
    }

    // Handle confusion
    if (attacker.status === 'confusion') {
        const coinFlip = Math.random() < 0.5;
        if (!coinFlip) {
            addLog('player', `${attacker.name} は混乱している! 技が失敗した`);
            roomRef.child(`${playerRole}/hasAttacked`).set(true);
            return;
        }
    }

    // Handle paralysis/sleep
    if (attacker.status === 'paralysis' || attacker.status === 'sleep') {
        alert('状態異常で技が使えません');
        return;
    }

    let damage = move.damage || 0;

    // Apply effects
    if (move.effectType === 'coin_flip_damage') {
        let heads = 0;
        for (let i = 0; i < move.coinCount; i++) {
            if (Math.random() < 0.5) heads++;
        }
        damage += heads * move.damagePerHead;
        addLog('system', `コイン: ${heads}回オモテ!`);
    }

    // Apply weakness
    if (defender.weakness && attacker.type === defender.weakness) {
        damage *= 2;
        addLog('system', '弱点ので2倍ダメージ!');
    }

    // Apply damage
    const newHp = Math.max(0, defender.currentHp - damage);

    roomRef.child(`${oppRole}/active/currentHp`).set(newHp);
    roomRef.child(`${playerRole}/hasAttacked`).set(true);

    addLog('player', `${attacker.name} の攻撃! ${defender.name} に ${damage} ダメージ!`);

    // Check if fainted
    if (newHp === 0) {
        handleFaint(oppRole);
    }

    // Apply status effects
    if (move.effectType && move.effectType.includes('status_')) {
        const status = move.effectType.replace('status_', '');
        roomRef.child(`${oppRole}/active/status`).set(status);
        addLog('system', `${defender.name} は ${status} 状態になった!`);
    }

    // Force turn end
    setTimeout(() => {
        if (newHp > 0) { // Only force end if game didn't enter switching/end phase via handleFaint
            // However, handleFaint runs synchronously. 
            // If phase changed to 'switching', we still want to end the turn so the opponent becomes the active player to switch?
            // Actually, if phase is 'switching', the victim needs to switch.
            // If we end turn, the currentTurn becomes the victim (opponent).
            // That seems correct.
            endTurn();
        } else {
            // If fainted, handleFaint was called.
            // handleFaint handles phase change. 
            // We still want to switch turns so the next player (who has to switch) is the "current" player?
            // Or does switching happen "between" turns?
            // In this logic, let's just end the turn.
            endTurn();
        }
    }, 1500);
}

function initiateRetreat() {
    const player = gameState[playerRole];

    if (!player.active) {
        alert('バトル場にポケモンがいません');
        return;
    }

    const active = player.active;
    const retreatCost = active.retreatCost || 0;

    if (active.attachedEnergy.length < retreatCost) {
        alert(`にげるには ${retreatCost} 個のエネルギーが必要です`);
        return;
    }

    // Select bench Pokemon to switch to
    const benchIndex = prompt('交代先のベンチポケモンを選んでください (1-3)');
    if (benchIndex === null) return;

    const index = parseInt(benchIndex) - 1;
    const bench = normalizeBench(player.bench);

    if (index < 0 || index > 2 || !bench[index]) {
        alert('無効な選択です');
        return;
    }

    // Remove energy for retreat cost
    const newEnergy = active.attachedEnergy.slice(retreatCost);
    const newActive = { ...bench[index], attachedEnergy: bench[index].attachedEnergy || [] };
    bench[index] = { ...active, attachedEnergy: newEnergy };

    roomRef.child(`${playerRole}/active`).set(newActive);
    roomRef.child(`${playerRole}/bench`).set(bench);

    addLog('player', `${active.name} と ${newActive.name} を交代した`);
}

function handleFaint(role) {
    // role is the Victim
    const player = gameState[role];
    const fainted = player.active;

    // Add to discard
    const discard = [...(player.discard || [])];
    discard.push(fainted);
    roomRef.child(`${role}/discard`).set(discard);

    // Award points to Attacker (Opponent of Victim)
    const points = fainted.isEx ? 2 : 1;
    const attackerRole = role === 'p1' ? 'p2' : 'p1';
    const attacker = gameState[attackerRole];
    const newScore = (attacker.score || 0) + points;

    roomRef.child(`${attackerRole}/score`).set(newScore);

    addLog('system', `${fainted.name} はきぜつした! ${attacker.name} に ${points} ポイント`);

    // Check win condition - score
    if (newScore >= 3) {
        roomRef.update({
            phase: 'ended',
            winner: attackerRole
        });
        return;
    }

    // Check if victim has bench Pokemon
    const bench = normalizeBench(player.bench);
    const hasBenchPokemon = bench.some(p => p !== null);

    if (!hasBenchPokemon) {
        // No bench Pokemon - instant loss
        addLog('system', `${player.name} は場に出せるポケモンがいない!`);
        roomRef.update({
            phase: 'ended',
            winner: attackerRole
        });
        return;
    }

    // Switch phase
    addLog('system', `${player.name} はバトル場に出すポケモンを選んでください`);
    roomRef.update({ phase: 'switching' });
    roomRef.child(`${role}/active`).set(null);
    roomRef.child(`${role}/switchingReady`).set(false);
}

function handlePokemonClick(pokemon, containerId) {
    if (gameState.phase === 'switching' && containerId.startsWith('player-bench')) {
        const player = gameState[playerRole];

        if (!player.active && !player.switchingReady) {
            const benchIndex = parseInt(containerId.split('-')[2]);
            const bench = normalizeBench(player.bench);
            const newActive = bench[benchIndex];

            if (!newActive) {
                alert('そこにはポケモンがいません');
                return;
            }

            bench[benchIndex] = null;

            roomRef.child(`${playerRole}/active`).set(newActive);
            roomRef.child(`${playerRole}/bench`).set(bench);
            roomRef.child(`${playerRole}/switchingReady`).set(true);

            addLog('player', `${newActive.name} をバトル場に出した`);

            // Check if both ready - need to check updated state
            setTimeout(() => {
                roomRef.once('value', (snapshot) => {
                    const state = snapshot.val();
                    const p1 = state.p1;
                    const p2 = state.p2;

                    if ((p1.switchingReady || p1.active) && (p2.switchingReady || p2.active)) {
                        roomRef.update({ phase: 'battle' });
                        // Reset switching flags
                        roomRef.child('p1/switchingReady').set(false);
                        roomRef.child('p2/switchingReady').set(false);
                    }
                });
            }, 100);
        }
    }
}

function endTurn() {
    const player = gameState[playerRole];

    // Apply status effects
    applyEndOfTurnStatus(playerRole);
    applyEndOfTurnStatus(oppRole);

    // Increment turns on field
    if (player.active) {
        const newTurns = (player.active.turnsOnField || 0) + 1;
        roomRef.child(`${playerRole}/active/turnsOnField`).set(newTurns);
    }
    // Increment turns on field
    if (player.active) {
        const newTurns = (player.active.turnsOnField || 0) + 1;
        roomRef.child(`${playerRole}/active/turnsOnField`).set(newTurns);
    }

    // Use raw bench to preserve actual indices
    const bench = player.bench || {};
    Object.keys(bench).forEach(key => {
        const pokemon = bench[key];
        if (pokemon) {
            const newTurns = (pokemon.turnsOnField || 0) + 1;
            roomRef.child(`${playerRole}/bench/${key}/turnsOnField`).set(newTurns);
        }
    });

    // Switch turn
    const nextTurn = oppRole;
    roomRef.update({ currentTurn: nextTurn });
    roomRef.child(`${nextTurn}/hasAttachedEnergy`).set(false);
    roomRef.child(`${nextTurn}/hasAttacked`).set(false);

    // Draw card and generate energy for next player
    drawCard(nextTurn);
    generateEnergy(nextTurn);

    addLog('system', `${gameState[nextTurn].name} のターン開始`);
}

function applyEndOfTurnStatus(role) {
    const player = gameState[role];
    if (!player.active || !player.active.status) return;

    const status = player.active.status;
    const pokemon = player.active;

    if (status === 'poison') {
        const newHp = Math.max(0, pokemon.currentHp - 10);
        roomRef.child(`${role}/active/currentHp`).set(newHp);
        addLog('system', `${pokemon.name} は毒のダメージを受けた (10)`);

        if (newHp === 0) {
            handleFaint(role);
        }
    } else if (status === 'burn') {
        const newHp = Math.max(0, pokemon.currentHp - 20);
        roomRef.child(`${role}/active/currentHp`).set(newHp);
        addLog('system', `${pokemon.name} はやけどのダメージを受けた (20)`);

        if (newHp === 0) {
            handleFaint(role);
        } else {
            // 50% chance to cure
            if (Math.random() < 0.5) {
                roomRef.child(`${role}/active/status`).set(null);
                addLog('system', `${pokemon.name} のやけどが治った!`);
            }
        }
    } else if (status === 'paralysis') {
        roomRef.child(`${role}/active/status`).set(null);
        addLog('system', `${pokemon.name} のまひが治った`);
    } else if (status === 'sleep') {
        if (Math.random() < 0.5) {
            roomRef.child(`${role}/active/status`).set(null);
            addLog('system', `${pokemon.name} が目を覚ました!`);
        }
    }
}

// Battle Log
// Battle Log
export function addLog(type, message) {
    if (!roomRef) return;
    roomRef.child('logs').push({
        type,
        message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

function renderLog(type, message) {
    const logMessages = document.getElementById('log-messages');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logMessages.appendChild(entry);
    logMessages.scrollTop = logMessages.scrollHeight;
}
