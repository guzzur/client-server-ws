import WebSocket from 'ws';
import { WSMessage } from 'types/WSMessage';

const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT || 8080) });

export const broadcast = (data: WSMessage): void =>
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });

export default wss;
