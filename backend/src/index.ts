import './preStart'; // Must be the first import
import app from 'src/app';
import wss from 'src/wsServer';
import logger from '@shared/logger';
import { WSMessage, WSMessageType } from 'types/WSMessage';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});

wss.on('connection', (ws) => {
  const newConnectionMsg: WSMessage = {
    type: WSMessageType.CONNECTION_CHANGED,
    data: 'connection establised',
  };
  logger.info('WS connection established');
  ws.send(JSON.stringify(newConnectionMsg));
});
