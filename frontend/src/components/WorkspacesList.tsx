import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { useRecoilState } from 'recoil';
import { workspaceListState } from '../recoil/atoms';

import { ws, getWorkspaces } from '../services/network';
import { WorkspaceStatus } from '../types/Workspace';
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

  const workspaceStatusToEmoji = (workspaceStatus: WorkspaceStatus) => {
    switch (workspaceStatus) {
      case WorkspaceStatus.DELETED:
        return '❌';
      case WorkspaceStatus.OFFLINE:
        return '🚫';
      case WorkspaceStatus.PREPARING:
        return '🏃';
      case WorkspaceStatus.READY:
        return '👷';
      case WorkspaceStatus.TERMINATED:
        return '💀';
      default:
        return '👽';
    }
  };

  return (
    <div className="events-list-wrapper">
      {workspaceList.map((workspace) => (
        <Card key={workspace.id}>
          <Card.Body>
            <Row>
              <Col sm={12} md={3}>
                {workspaceStatusToEmoji(workspace.status)} {workspace.status}
              </Col>
              <Col sm={12} md={3}>
                {workspace.createdAt}
              </Col>
              <Col sm={12} md={6}>
                {workspace.owner}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default EventsList;
