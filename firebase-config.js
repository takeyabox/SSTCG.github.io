// Firebase Configuration Template
// Replace the values below with your actual Firebase project credentials

export const firebaseConfig = {
    apiKey: "AIzaSyCgAlA2GEU-tkCro-gG3Y3461MP05Egx2E",
    authDomain: "sstcg-34266.firebaseapp.com",
    databaseURL: "https://sstcg-34266-default-rtdb.firebaseio.com/",
    projectId: "sstcg-34266",
    storageBucket: "sstcg-34266.firebasestorage.app",
    messagingSenderId: "1074065459252",
    appId: "1:1074065459252:web:11a63b1a184dd44242e261"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.database();

// Helper functions for Firebase operations
export function generateRoomId() {
    return Math.random().toString(36).substring(2, 9);
}

export async function createRoom(roomId, playerData) {
    const roomRef = db.ref(`rooms/${roomId}`);
    await roomRef.set({
        p1: playerData,
        p2: null,
        status: 'waiting',
        phase: 'waiting',
        currentTurn: null,
        coinResult: null,
        winner: null,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });
    return roomRef;
}

export async function joinRoom(roomId, playerData) {
    const roomRef = db.ref(`rooms/${roomId}`);
    const snapshot = await roomRef.once('value');
    const roomData = snapshot.val();

    if (!roomData) {
        throw new Error('Room does not exist');
    }

    if (roomData.p2) {
        throw new Error('Room is full');
    }

    await roomRef.child('p2').set(playerData);
    await roomRef.child('status').set('starting');

    return roomRef;
}

export async function updateRoomData(roomId, updates) {
    const roomRef = db.ref(`rooms/${roomId}`);
    await roomRef.update(updates);
}

export function listenToRoom(roomId, callback) {
    const roomRef = db.ref(`rooms/${roomId}`);
    roomRef.on('value', (snapshot) => {
        callback(snapshot.val());
    });
    return roomRef;
}

export function removeRoomListener(roomRef) {
    if (roomRef) {
        roomRef.off();
    }
}
