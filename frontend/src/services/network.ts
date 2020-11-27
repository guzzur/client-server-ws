const url = process.env.REACT_APP_SERVER_URL || 'localhost';
const port = process.env.REACT_APP_SERVER_PORT || 3002;
const wsPort = process.env.REACT_APP_WS_PORT || 8080;

export const ws = new WebSocket(`ws://${url}:${wsPort}`);

export const getWorkspaces = () => fetch(`http://${url}:${port}/api/workspaces`);
