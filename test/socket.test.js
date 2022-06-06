const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');
const { PORT } = require('../config');

describe('Socket io tests', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('Joining room', (done) => {
    serverSocket.on('join', (arg) => {
      expect(arg).toBe('12ekj17djskjw872891hwn');
      done();
    });
    clientSocket.emit('join', '12ekj17djskjw872891hwn');
  });

  test('Sending a message', (done) => {
    serverSocket.on('send-message', (arg) => {
      expect(arg).toBe('hello world');
      done();
    });
    clientSocket.emit('send-message', 'hello world');
  });

  test('Notify', (done) => {
    serverSocket.on('notification', (arg, arg2) => {
      expect(arg).toBe(123);
      expect(arg2).toBe('hello world');
      done();
    });
    clientSocket.emit('notification', 123, 'hello world');
  });

  test('While user typing', (done) => {
    serverSocket.on('typing', (arg) => {
      expect(arg).toBe('hello world');
      done();
    });
    clientSocket.emit('typing', 'hello world');
  });

  test('During video-call', (done) => {
    serverSocket.on('accept-video', (arg) => {
      expect(arg).toBe('123');
      done();
    });
    clientSocket.emit('accept-video', '123');
  });

  test('Disconnecting video-call', (done) => {
    serverSocket.on('disconnect-call', (arg) => {
      expect(arg).toBe('call ended');
      done();
    });
    clientSocket.emit('disconnect-call', 'call ended');
  });

  test('Decline Incoming video-call', (done) => {
    serverSocket.on('call-decline', (arg) => {
      expect(arg).toBe('call ignored');
      done();
    });
    clientSocket.emit('call-decline', 'call ignored');
  });
});
