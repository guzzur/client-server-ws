# Websockets libraries and alternatives comparison

## The task

We aim to tackle 3 different use-cases and test what works best for each. All solutions will be measured by their ability to maintain solid connection, be as light as possible and be efficient (in terms of size, time and protocol overhead) as much as possible.

Also we will test alternatives to using websockets at the first place.

We **will not** dive into decisions about using one or another solution, will duscuss them all when we approach to solving the specific task.

## Use-cases

1. Client-server ws communication, where the server sends all displayable data on load and on each change

2. Client-server ws communication, where the client is only subscribed to a subset of data in its context, and the server sends all the data in the given context's subscription

3. Client-server ws communication, where the whole displayable data is too big, so the server sends the change only as diffs, and the client merges them with the previous data

---

## Native JS WS libraries

We will be comparing only 3 libraries, `ws`, `socket.io` and `uWebsockets`, since they are leading the websockets category in almost every comparable way.

All numbers below are as on Nov 28, 2020. Some more interesting statistics can be found [here](https://npmcompare.com/compare/meteor,socket.io,uws,websocket,ws).

| Library     | Weekly downloads                                                         | Stars | Num of contributors | Issues (open/closed) | Last update | Battle tested since |
| ----------- | ------------------------------------------------------------------------ | ----- | ------------------- | -------------------- | ----------- | ------------------- |
| ws          | 31M                                                                      | 15.3K | 164                 | 6/1195               | Month ago   | Nov 2011            |
| socket.io   | 3.5M                                                                     | 51K   | 178                 | 519/2416             | Hours ago   | Mar 2010            |
| uWebsockets | _Not published to npm, but claims to have 55M downloads since it exists_ | 12K   | 69                  | 16/263               | Days ago    | Apr 2016            |

### ws

#### Pros

- Simple to use
- Well documented
- Has enormous amount of downloads (and therefore answers on StackOverflow, code examples etc.)

#### Cons

- Does not support broadcast OOTB
- Does not support partial subscription OOTB

### socket.io

#### Pros

- Very popular
- Supplies both server and client sides
- Gives an abstraction for websockets-like behavior utilizing fallback transporters for clients that do not support websockets (using long polling and other thicks under the hood)
- Has the ability to join a specific group of channels

#### Cons

- Uses a non-standard protocol
  - Cannot be used with anything other than socket.io on any side
  - Does not allow to use native well-benchmarked browser's native websockets

### uWebsockets

#### Pros

- Has the ability to join a specific group of channels
- Has the best performance benchmarks between all candidates

#### Cons

- Is pretty new to the market, and probably should be used in more heavy systems before being adopted

---

## WS alternatives comparison

### Short polling (client pull)

Polling the server every period of time, if any new data should be transferred.

### Long polling (client pull)

Sending request to the server, which will be answere once new data arrives, or the request times out. Once new data arrives, the client will sent a new "waiting" request.

### Server-Sent Events (server push)

SSE allows the server to asynchronously push the data to the client once the client-server connection is established. The server pushes new data whenever it arrives. It can be considered as a one-way publish-subscribe model.

The limitation for number of open connections may be resolved with HTTP/2's Multiplexing or Server Push.

### Real-time databases (e.g. Firebase)

Server accepts group subscription (that may consist of 1 connection as well) to changes made to the RT (usually cloud) database, and broadcasts the updated document to the subscribed clients in the group.

The implementation under the hood is using WebSockets, but it gives you the ability to have broadcasts, subscription groups, role based data access restiction out of the box.

| Alternative   | Time efficiency                                                                                                   | Size efficiency                                                                     | Max num of conn                                        | vs WS                                                                                                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Short polling | Best for updates in constant periods of time (e.g. read temperature from a sensor once per minute)                | Will have high overhead if most of the polling requests will not bring any new data | Only limited by server's rate limiters                 | In our implementation where updates come within no constant time it may have huge overhead in amount and size of an "empty" responses                                                                        |
| Long polling  | Best for short amount of updates in a period of time that doesn't exceed the HTTP request standard timeout (100s) | May have overhead for systems where data changes once in a while                    | May cause open connections bottleneck for some servers | Will drop lots of requests on timeout if our data will not have any change within HTTP timeout window                                                                                                        |
| SSE           | As efficient as WS, almost 0 time overhead                                                                        | As efficient as WS                                                                  | 6 per server, which is a big issue with SSE            | WS is bidirectional, when SSE is a push-only model. I.e. we will not be able to push events from our connected clients to the server. Also, more browsers support WS, which is a plus                        |
| RT DBs        | Exactly the same as WS, since it uses WS                                                                          | Exactly the same as WS, since it uses WS                                            | 100K-200K before upgrading to a bigger plan            | In a "real-life" solution for small projects I would totally prefer going with Firebase, since it supplies the whole WS abstraction needed, including authentication, authorization etc., with 0 boilerplate |
