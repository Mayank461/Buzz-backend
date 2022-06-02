const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const {PORT}= require('../config');

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;


  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Joining room", (done) => {
    serverSocket.on("join_room", (arg) => {
      expect(arg).toBe("12ekj17djskjw872891hwn");
      done();
    });
    clientSocket.emit("join_room", "12ekj17djskjw872891hwn");
  });

  test("transferring peer id", (done) => {
    serverSocket.on("transfer", (arg) => {
      expect(arg).toBe("tt1y2878920220hnss");
      done();
    });
    clientSocket.emit("transfer", "tt1y2878920220hnss");
  });

  test("Sending a message", (done) => {
    serverSocket.on("send_message", (arg) => {
      expect(arg).toBe("hello world");
      done();
    });
    clientSocket.emit("send_message", "hello world");
  });

  test("While user typing", (done) => {
    serverSocket.on("typing", (arg) => {
        expect(arg).toBe("hello world");
        done();
    });
    clientSocket.emit("typing", "hello world");
  });
  test("During video-call", (done) => {
    serverSocket.on("video-calling", (arg) => {
        expect(arg).toBe("hii there");
        done();
    });
    clientSocket.emit("video-calling", "hii there");
  });

  test("Disconnecting video-call", (done) => {
    serverSocket.on("disconnect-call", (arg) => {
        expect(arg).toBe("call ended");
        done();
    });
    clientSocket.emit("disconnect-call", "call ended");
  });

  test("Decline Incoming video-call", (done) => {
    serverSocket.on("call-decline", (arg) => {
        expect(arg).toBe("call ignored");
        done();
    });
    clientSocket.emit("call-decline", "call ignored");
  });


  test("Connecting both side", (done) => {
    serverSocket.on("connection-both", (arg) => {
        expect(arg).toBe("both are connected");
        done();
    });
    clientSocket.emit("connection-both", "both are connected");
  });
});