import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { workspaceListState } from '../recoil/atoms';

import { ws, getWorkspaces } from '../services/network';
import { WSMessageType } from '../types/WSMessage';

function EventsList() {
  const [workspaceList, setWorkspaceList] = useRecoilState(workspaceListState);
  useEffect(() => {
    const getWorkspacesOnLoad = () => {
      getWorkspaces()
        .then((res) => res.json())
        .then(({ workspaces }) => setWorkspaceList([...workspaces]));
    };
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('ws connected');
    };

    ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const { type: messageType, data } = JSON.parse(evt.data || '');

      switch (messageType) {
        case WSMessageType.CONNECTION_CHANGED:
          console.log(data);
          break;
        case WSMessageType.WORKSPACE_LIST:
          setWorkspaceList(data);
          break;
        default:
          console.log(`got unknown message type from ws: ${messageType}`);
      }
    };

    ws.onclose = () => {
      console.log('ws disconnected');
      // automatically try to reconnect on connection loss
    };

    getWorkspacesOnLoad();
  }, [setWorkspaceList]);

  return (
    <div className="events-list-wrapper">
      {workspaceList.map((workspace) => (
        <div key={workspace.id}>{workspace.owner}</div>
      ))}
    </div>
  );
}

export default EventsList;
