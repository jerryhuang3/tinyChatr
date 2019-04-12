const server = require('http').createServer();
let app = require('./http-server');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = process.env.PORT || 3001;

// Mount app
server.on('request', app);

function randomRGB() {
  const r = Math.floor(Math.random() * 210);
  const g = Math.floor(Math.random() * 210);
  const b = Math.floor(Math.random() * 210);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log('HI');
// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');

  console.log('#008000');
  wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(msg));
    });
  };

  // Send the number of clients
  wss.broadcast(wss.clients.size);

  // System message when a client joins the chat
  const newClientNotification = {
    id: uuid(),
    type: 'incomingNotification',
    content: 'Anonymous user has joined the chat.'
  };
  wss.broadcast(newClientNotification);

  const userColor = randomRGB();
  ws.on('message', function incoming(clientMessage) {
    const message = JSON.parse(clientMessage);
    
    switch (message.type) {
      case 'postMessage':
        if (!message.username) {
          message.username = 'Anonymous';
        }
        message.id = uuid();
        message.type = 'incomingMessage';
        message.color = userColor;

        wss.broadcast(message);
        break;
      case 'postNotification':
        message.id = uuid();
        message.type = 'incomingNotification';

        wss.broadcast(message);
        break;
      default:
        throw new Error('Unknown event type ' + clientMessage.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast(wss.clients.size);
    console.log('Client disconnected');
  });
});

server.listen(PORT, function() {
  console.log(`http/ws server listening on ${PORT}`);
});
