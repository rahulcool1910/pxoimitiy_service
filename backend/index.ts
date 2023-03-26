import express from 'express'
import serverless from "serverless-http";
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

import { randomUUID } from 'crypto'
import mockData from './mockData.json' assert {type: 'json'};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "js")));
app.use(express.json())

app.use(cors());

const port = 3001;

import http from 'http';
const server = http.createServer(app);

import { Server } from "socket.io";
import path from 'path';

import { createClient, GeoReplyWith } from 'redis'
import { Client } from 'redis-om'
import { assert } from 'console';

const redis = createClient({ url: 'redis://localhost:6379' })
await redis.connect()
const client = await new Client().use(redis)

app.use(express.static('public'));

const io = new Server(server, {
  cors: {
    origin: '*'
  },

});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});


app.post('/set', async (req, res) => {
  const { key, value } = req.body;
  await redis.set(key, value)
  res.json({
    status:
      "ok"
  })
});
app.get('/get', async (req, res) => {
  const { key } = req.body;
  const data = await redis.get(key)
  res.json({ data })
});


app.post('/setBusiness', async (req, res) => {
  try {
    const { lat, lng } = req.body
    const data = await redis.geoAdd(
      'world', {
      latitude: lat,
      longitude: lng,
      member: mockData[Math.floor(Math.random() * 100)]['business_name']
    }
    )
    console.log("🚀 ~ file: index.ts:65 ~ app.post ~ data:", data)
    res.json({
      statusCode: 200,
      status: 'success'
    })

  } catch (error) {
    res.json({
      statusCode: 400,
      status: 'failed',
      error
    })
  }
});

app.post('/getBusiness', async (req, res) => {
  try {
    // Destructuring data
    const { lat, lng } = req.body;
    // Fetching nearby businesses
    const data = await redis.geoSearchWith(
      'world', {
      latitude: lat,
      longitude: lng
    },
      { radius: 2, unit: 'km' },
      [GeoReplyWith.COORDINATES]
    );
    // returning data
    res.json({
      statusCode: 200,
      status: 'success',
      data
    });
  } catch (error) {
    // handling error
    res.json({
      statusCode: 400,
      status: 'failed',
      error
    })
  }
});



io.on('connection', async (socket) => {
  const { userName } = socket.handshake.auth

  console.log("🚀 ~ file: index.ts:23 ~ io.on ~ userName", userName)
  await redis.set(userName, socket.id);
  socket.on('chat_message', async (msg) => {

    const user = msg.userData;
    const message = msg.message;
    const receiver = await redis.get(user)
    if (!receiver) return;
    console.log("🚀 ~ file: index.ts:65 ~ socket.on ~ receiver", receiver)
    io.to(receiver).emit('chat_message', message)
  });
  socket.on('disconnect', async (data) => {
    await redis.del(userName)
    console.log('user disconnected', userName);
  });
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
//   console.log('a user connected', socket.id);

//   // socket.on('disconnect', () => {
//   //   console.log('user disconnected');
//   // });
// });

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

