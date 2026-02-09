export const registerChatSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('chat:join', (conversationId) => {
      socket.join(conversationId);
    });

    socket.on('disconnect', () => {
      // Keep minimal for MVP; presence tracking can be added later.
    });
  });
};
