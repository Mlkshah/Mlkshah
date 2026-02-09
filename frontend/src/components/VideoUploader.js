import React from 'react';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function VideoUploader({ onPick }) {
  const chooseVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
    if (!result.canceled) onPick(result.assets[0]);
  };

  return <Button title="Upload Video" onPress={chooseVideo} />;
}
