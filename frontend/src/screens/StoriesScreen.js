import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import StoryUploader from '../components/StoryUploader';
import api, { API_BASE_URL } from '../services/api';

const host = API_BASE_URL.replace('/api', '');

export default function StoriesScreen() {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    const { data } = await api.get('/stories/feed');
    setStories(data);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const uploadStory = async (asset) => {
    const formData = new FormData();
    formData.append('media', { uri: asset.uri, type: asset.mimeType || 'image/jpeg', name: asset.fileName || 'story.jpg' });
    await api.post('/stories', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    fetchStories();
  };

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <StoryUploader onPick={uploadStory} />
      <FlatList
        data={stories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>@{item.author?.username}</Text>
            {item.mediaType === 'image' ? (
              <Image source={{ uri: `${host}${item.mediaUrl}` }} style={{ width: '100%', height: 200 }} />
            ) : (
              <Text>Video story: {item.mediaUrl}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
