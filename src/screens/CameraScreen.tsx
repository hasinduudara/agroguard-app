import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { analyzeCropImage } from '../services/api';

export default function CameraScreen({ navigation }: any) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  
  // State to handle the loading spinner
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the currently selected language (si or en)
  const { i18n } = useTranslation();

  // Function to open the device camera
  async function takePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant camera permissions.");
      return;
    }

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
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant gallery permissions.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  // Function to handle the backend analysis request
  async function handleAnalyzePlant() {
    if (!imageUri) return;

    setIsLoading(true); // Start loading spinner

    try {
      // Call the API service with the image and current language
      const result = await analyzeCropImage(imageUri, i18n.language);
      
      setIsLoading(false); // Stop loading spinner
      
      // Show the result in an alert for now
      Alert.alert("Analysis Complete", result.final_advice);
      
    } catch (error: any) {
      setIsLoading(false);
      
      // Extract the exact error message sent from the FastAPI backend
      const errorMessage = error.response?.data?.detail || "An unexpected error occurred.";
      
      // Show the actual backend error in the alert
      Alert.alert("Backend Error", errorMessage);
    }
  }

  // Function to remove the selected image
  function clearImage() {
    setImageUri(null);
  }

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center px-6">
      
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

      <View className="w-full flex-row justify-between mb-6">
        <TouchableOpacity 
          className="bg-green-700 py-4 rounded-xl flex-1 mr-2"
          onPress={takePhoto}
          disabled={isLoading}
        >
          <Text className="text-white font-bold text-center">Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-green-600 py-4 rounded-xl flex-1 ml-2"
          onPress={pickImage}
          disabled={isLoading}
        >
          <Text className="text-white font-bold text-center">Gallery</Text>
        </TouchableOpacity>
      </View>

      {imageUri ? (
        <View className="w-full space-y-3">
          <TouchableOpacity 
            className="bg-blue-600 py-4 rounded-xl w-full flex-row justify-center items-center h-14"
            onPress={handleAnalyzePlant}
            disabled={isLoading}
          >
            {/* Show spinner or text based on loading state */}
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-bold text-center text-lg">Analyze Plant</Text>
            )}
          </TouchableOpacity>

          {!isLoading && (
            <TouchableOpacity 
              className="bg-red-500 py-4 rounded-xl w-full"
              onPress={clearImage}
            >
              <Text className="text-white font-bold text-center">Clear Image</Text>
            </TouchableOpacity>
          )}
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