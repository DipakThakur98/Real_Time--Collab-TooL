import { io } from 'socket.io-client';

let rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
if (typeof rawApiUrl === 'string' && rawApiUrl.includes('VITE_API_URL=')) {
    rawApiUrl = rawApiUrl.split('VITE_API_URL=')[1];
}
let rawSocketUrl = import.meta.env.VITE_SOCKET_URL;
if (typeof rawSocketUrl === 'string' && rawSocketUrl.includes('VITE_SOCKET_URL=')) {
    rawSocketUrl = rawSocketUrl.split('VITE_SOCKET_URL=')[1];
}

const SOCKET_URL = rawSocketUrl || rawApiUrl.replace(/\/api$/, '');

let socket;

export const initiateSocketConnection = (token) => {
	if (!socket) {
		socket = io(SOCKET_URL, {
			auth: { token },
		});
		console.log(`Connecting socket...`);

		socket.on('connect_error', (err) => {
			console.error('Socket connection error:', err.message);
			if (err.message === 'Authentication error') {
				// Clear token/user and force redirect to login since server invalidated token
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('user');
				window.location.href = '/login';
			}
		});
	}
    return socket;
};

export const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if(socket) {
		socket.disconnect();
		socket = null;
	}
};

export const getSocket = () => socket;
