import React from 'react';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function StoryUploader({ onPick }) {
  const chooseMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All });
    if (!result.canceled) onPick(result.assets[0]);
  };

  return <Button title="Upload Story" onPress={chooseMedia} />;
}
