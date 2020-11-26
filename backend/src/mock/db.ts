import faker from 'faker';

import { EventId, IEvent } from 'types/Event';
import { WorkspaceStatus, IWorkspace, WorkspaceId } from 'types/Workspace';
import { DBStore } from 'src/types/DBStore';

let events: IEvent[] = [];
let workspaces: IWorkspace[] = [];

// Generates ${numOfFakeEvents} events with 1 workspace each
const numOfFakeEvents = 3;
const generateFakeData = (): void => {
  workspaces = (events = Array.from(Array(numOfFakeEvents).keys()).map((elem) => ({
    id: elem.toString(),
    name: faker.name.findName(),
  }))).map((event) => ({
    id: faker.random.uuid(),
    eventId: event.id,
    owner: faker.internet.email(),
    status: WorkspaceStatus.PREPARING,
    createdAt: new Date(),
  }));
};

const initDb = (): void => {
  generateFakeData();
};

const getDb = (): DBStore => {
  if (!events) initDb();
  return {
    getEvents: () => [...events],
    getEvent: (id: String) => events.find((event) => event.id === id) || {},
    addEvent: (event: IEvent) => {
      const constructedEvent = { ...event, id: events.length.toString() };
      events.push(constructedEvent);
      return constructedEvent;
    },
    getWorkspaces: () => [...workspaces],
    getWorkspacesByEventId: (eventId: EventId) =>
      workspaces.filter((workspace) => workspace.eventId === eventId),
    getWorkspace: (workspaceId: WorkspaceId) =>
      workspaces.filter((workspace) => workspace.id === workspaceId),
    addWorkspaceToEvent: (eventId: EventId, workspace: IWorkspace) => {
      const constructedWorkspace = { ...workspace, id: faker.random.uuid(), eventId };
      workspaces.push(constructedWorkspace);
      return constructedWorkspace;
    },
    updateWorkspace: (
      eventId: EventId,
      workspaceId: WorkspaceId,
      workspace: IWorkspace
    ): IWorkspace | {} => {
      const index = workspaces.findIndex((ws) => ws.id === workspaceId);
      if (index === -1 || workspaces[index].eventId !== eventId) return {};
      const constructedWorkspace = { ...workspaces[index], ...workspace };
      workspaces[index] = constructedWorkspace;
      return workspaces[index];
    },
  };
};

export { initDb, getDb };
