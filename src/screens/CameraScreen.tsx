import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }: any) {
  // State to hold the selected image URI
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Function to open the device camera
  async function takePhoto() {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant camera permissions to use this feature.");
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  // Function to pick an image from the device gallery
  async function pickImage() {
    // Request gallery permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant gallery permissions to use this feature.");
      return;
    }

    // Launch the image library using the updated mediaTypes array format
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // This fixes the deprecation warning
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  // Function to remove the selected image
  function clearImage() {
    setImageUri(null);
  }

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center px-6">
      
      {/* Image Preview Section */}
      <View className="w-full h-72 bg-gray-300 rounded-2xl items-center justify-center overflow-hidden mb-8 border-2 border-gray-400 border-dashed">
        {imageUri ? (
          <Image 
            source={{ uri: imageUri }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-gray-500 font-semibold text-lg">No image selected</Text>
        )}
      </View>

      {/* Buttons Section */}
      <View className="w-full flex-row justify-between mb-6">
        <TouchableOpacity 
          className="bg-green-700 py-4 rounded-xl flex-1 mr-2"
          onPress={takePhoto}
        >
          <Text className="text-white font-bold text-center">Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-green-600 py-4 rounded-xl flex-1 ml-2"
          onPress={pickImage}
        >
          <Text className="text-white font-bold text-center">Pick from Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Buttons based on image selection */}
      {imageUri ? (
        <View className="w-full space-y-3">
          <TouchableOpacity 
            className="bg-blue-600 py-4 rounded-xl w-full mb-3"
            onPress={function() { Alert.alert("Coming Soon", "We will connect this to the backend next!"); }}
          >
            <Text className="text-white font-bold text-center text-lg">Analyze Plant</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-red-500 py-4 rounded-xl w-full"
            onPress={clearImage}
          >
            <Text className="text-white font-bold text-center">Clear Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          className="bg-gray-700 py-4 rounded-xl w-full"
          onPress={function() { navigation.goBack(); }}
        >
          <Text className="text-white font-bold text-center text-lg">Go Back</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}