import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import api, { API_BASE_URL } from '../services/api';
import VideoUploader from '../components/VideoUploader';

const host = API_BASE_URL.replace('/api', '');

export default function VideosScreen() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const { data } = await api.get('/videos/mine');
    setVideos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (asset) => {
    const formData = new FormData();
    formData.append('title', title || 'Untitled Video');
    formData.append('video', { uri: asset.uri, type: asset.mimeType || 'video/mp4', name: asset.fileName || 'video.mp4' });
    await api.post('/videos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setTitle('');
    load();
  };

  return (
    <View style={{ flex: 1, padding: 12, gap: 8 }}>
      <TextInput placeholder="Video title" value={title} onChangeText={setTitle} style={{ borderWidth: 1, padding: 8 }} />
      <VideoUploader onPick={upload} />
      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>{item.title} • {host}{item.videoUrl}</Text>}
      />
    </View>
  );
}
