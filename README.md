# client-server-ws

## TL;DR

To solve our use-cases in a manner that will enable us to continue using the code even after the system starts gaining more and more active users, I chose to go with `ws` for the server and native browser's `WebSocket` for the client.

The given code only supplies the solution for Step 1, but we can make it work for Steps 2 and 3 with not too much effort, without changing the server's or client's websockets libraries.

For more details you can check out the in depth comparison [here](./docs/ws-comparison.md).

## Open issues

Unfortunatelly this code does not:

- Solve Steps 2 and 3
- Have input validations (schemas & logic)
- Have tests, metrics and proper logging
- Use auth[n/z]

## Running instructions

This was developed and tested under:

```sh
node -v
# v14.12.0
uname -a
# Darwin 19.6.0 Darwin Kernel Version 19.6.0
```

### Frontend

```sh
cd frontend
nvm install
npm install
npm start
# will boot the react app on port 3001
```

### Backend

```sh
cd backend
nvm install
npm install
npm run start:dev
# will boot the express app on port 3002
# will boot the ws server on port 8080
```

## REST API commands

_You can pipe these to `jq` for prettifying_

```sh
# GET all events
curl localhost:3002/api/events

# POST event
curl -XPOST localhost:3002/api/events \
  -H "Content-Type: application/json" \
  -d '{"name": "Felix Razykov"}'

# GET all workspaces
curl -XGET localhost:3002/api/workspaces

# GET all event's workspaces
curl localhost:3002/api/events/3/workspaces

# POST workspace into event
curl -XPOST localhost:3002/api/events/3/workspaces \
  -H "Content-Type: application/json" \
  -d '{"owner": "me@razzy.dev"}'

curl -XPUT localhost:3002/api/events/0/workspaces/08b09bc2-f848-41a5-a018-2ecc43cfad06 \
  -H "Content-Type: application/json" \
  -d '{"owner": "someone@else.com", "status": "deleted"}'
```

## WScat commands

```sh
npm i -g wscat
wscat -c localhost:8080 # or npx wscat -c localhost:8080
# < connection established

# In another terminal session:
# curl -XPOST localhost:3002/api/events/2/workspaces \
#   -H "Content-Type: application/json" \
#   -d '{"owner": "me@razzy.dev"}'

# < [..., {"owner":"me@razzy.dev","createdAt":"2020-11-27T12:26:33.319Z","id":"cec46d4b-4410-4212-83a0-275bce140a74","eventId":"2"}]
```
