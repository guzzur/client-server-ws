# client-server-ws

## Running instructions

### Dev mode

#### Frontend

```sh
cd frontend
nvm install
npm install
npm start
# will boot the react app on port 3001
```

#### Backend

```sh
cd backend
nvm install
npm install
npm run start:dev
# will boot the express app on port 3002
```

## API commands

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
