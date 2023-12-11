import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const SERVER_URL = 'http://192.168.10.55:3000';

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result);
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  };

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: getFileName(photo.uri),
      type: 'image/jpg',
      uri:
        Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const getFileName = (uri) => {
    const uriComponents = uri.split('/');
    return uriComponents[uriComponents.length - 1];
  };
  
  const handleUploadPhoto = async () => {
    try {
      if (image) {
        let response = await fetch(`${SERVER_URL}/kepberakas`, {
          method: 'POST',
          body: createFormData(image),
        });

        let data = await response.json();

        console.log('Success:', data);
      } else {
        console.warn('No image selected.');
      }
    } catch (error) {
      console.error('Error uploading photo', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Upload Photo" onPress={handleUploadPhoto} />
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
      />
      {image && (
        <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}