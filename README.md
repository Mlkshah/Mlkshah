# Social Messaging MVP (Scalable Monorepo)

This repository now contains a full MVP skeleton for a social messaging app with:
- Real-time chat (private + group)
- Auth + profiles
- Follow/unfollow + feed (tweet-style short posts)
- Stories (24h image/video)
- Video uploads + simple creator dashboard
- Mobile-first React Native client (Instagram-like base aesthetic)

## Monorepo Structure

```text
.
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   ├── db.js
│       │   └── upload.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── userController.js
│       │   ├── postController.js
│       │   ├── storyController.js
│       │   ├── videoController.js
│       │   └── chatController.js
│       ├── middleware/auth.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Post.js
│       │   ├── Story.js
│       │   ├── Video.js
│       │   ├── Conversation.js
│       │   └── Message.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── userRoutes.js
│       │   ├── postRoutes.js
│       │   ├── storyRoutes.js
│       │   ├── videoRoutes.js
│       │   └── chatRoutes.js
│       ├── sockets/chatSocket.js
│       ├── utils/generateToken.js
│       └── uploads/
└── frontend/
    ├── package.json
    ├── App.js
    └── src/
        ├── components/
        │   ├── PostComposer.js
        │   ├── StoryUploader.js
        │   └── VideoUploader.js
        ├── context/AuthContext.js
        ├── navigation/RootNavigator.js
        ├── screens/
        │   ├── LoginScreen.js
        │   ├── RegisterScreen.js
        │   ├── FeedScreen.js
        │   ├── StoriesScreen.js
        │   ├── ChatListScreen.js
        │   ├── ChatRoomScreen.js
        │   ├── VideosScreen.js
        │   └── ProfileScreen.js
        └── services/
            ├── api.js
            ├── socket.js
            └── storage.js
```

## Backend (Node.js + Express + MongoDB + Socket.IO)

### Quick start
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Current MVP APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `POST /api/users/follow/:userId`
- `POST /api/posts` (short updates)
- `GET /api/posts/feed`
- `POST /api/stories` (multipart `media`)
- `GET /api/stories/feed`
- `POST /api/videos` (multipart `video` + `title`)
- `GET /api/videos/mine`
- `POST /api/chat/conversations`
- `GET /api/chat/conversations`
- `GET /api/chat/messages/:conversationId`
- `POST /api/chat/messages` (text + optional media)

### Real-time chat
Socket.IO event:
- join room: `chat:join` with `conversationId`
- receive message: `chat:message`

## Frontend (React Native / Expo)

### Quick start
```bash
cd frontend
npm install
npm start
```

Set `API_BASE_URL` in `frontend/src/services/api.js` to your backend host on device/emulator.

## AI Integration Points (Future)

These are intentionally **not implemented yet**, but the architecture leaves clean extension points:

1. **Chat text correction / smart reply**
   - Add service in `backend/src/services/ai/chatAssistant.js`
   - Call from `chatController.sendMessage` before persistence.

2. **Image/video enhancement for stories/videos**
   - Add media-processing pipeline hook in `storyController.uploadStory` and `videoController.uploadVideo`.
   - Move from local disk to object storage + async processing queue.

3. **Feed ranking and recommendation**
   - Add recommender module in new `backend/src/services/ai/feedRanker.js`
   - Call inside `postController.feed` before response.

4. **Content moderation (text/image/video)**
   - Insert moderation checks in `postController.createPost`, `storyController.uploadStory`, and `videoController.uploadVideo`.

## Scalability Notes

- Swap local `uploads/` for S3/GCS + CDN.
- Add Redis for socket scaling and queues.
- Add background workers for media transcoding.
- Partition chat data if message volume grows.
- Add automated tests + OpenAPI spec as next step.
