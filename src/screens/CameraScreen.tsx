import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { analyzeCropImage } from '../services/api';

export default function CameraScreen({ navigation }: any) {
  // States for multiple images and text input
  const [images, setImages] = useState<string[]>([]);
  const [textQuery, setTextQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { i18n } = useTranslation();

  // Function to open the device camera
  async function takePhoto() {
    if (images.length >= 3) {
      Alert.alert("Limit Reached", "You can only select up to 3 images.");
      return;
    }

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant camera permissions.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages(function(prevImages) {
        return [...prevImages, result.assets[0].uri];
      });
    }
  }

  // Function to pick up to 3 images from the gallery
  async function pickImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant gallery permissions.");
      return;
    }

    const remainingSlots = 3 - images.length;
    if (remainingSlots <= 0) {
      Alert.alert("Limit Reached", "You can only select up to 3 images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map(function(asset) { return asset.uri; });
      setImages(function(prevImages) {
        return [...prevImages, ...selectedUris].slice(0, 3);
      });
    }
  }

  // Function to submit data to the backend
  async function handleAnalyzePlant() {
    if (images.length === 0 && textQuery.trim() === '') {
      Alert.alert("Missing Information", "Please provide at least one image or describe your problem.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await analyzeCropImage(images, textQuery, i18n.language);
      setIsLoading(false);
      
      // Navigate to the Result Screen
      navigation.navigate('Result', { advice: result.final_advice });
      
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.detail || "An unexpected error occurred.";
      Alert.alert("Backend Error", errorMessage);
    }
  }

  // Function to reset inputs
  function clearAll() {
    setImages([]);
    setTextQuery('');
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 px-6 py-8" showsVerticalScrollIndicator={false}>
      
      <Text className="text-xl font-bold text-gray-800 mb-4">Describe the Problem</Text>
      
      {/* Text Input Area */}
      <TextInput
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 text-base"
        multiline
        numberOfLines={4}
        placeholder="Type your question in English, Sinhala, or Singlish..."
        value={textQuery}
        onChangeText={setTextQuery}
        textAlignVertical="top"
      />

      <Text className="text-xl font-bold text-gray-800 mb-4">Upload Images (Max 3)</Text>

      {/* Image Preview Area */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {images.map(function(uri, index) {
          return (
            <Image 
              key={index} 
              source={{ uri: uri }} 
              className="w-24 h-24 rounded-lg bg-gray-300" 
            />
          );
        })}
        {images.length < 3 && (
          <View className="w-24 h-24 rounded-lg bg-gray-200 border-2 border-dashed border-gray-400 items-center justify-center">
            <Text className="text-gray-500 text-xs text-center px-1">Add Image</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between mb-8">
        <TouchableOpacity className="bg-green-700 py-3 rounded-xl flex-1 mr-2" onPress={takePhoto} disabled={isLoading}>
          <Text className="text-white font-bold text-center">Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-600 py-3 rounded-xl flex-1 ml-2" onPress={pickImage} disabled={isLoading}>
          <Text className="text-white font-bold text-center">Gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="bg-blue-600 py-4 rounded-xl w-full flex-row justify-center items-center mb-4"
        onPress={handleAnalyzePlant}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white font-bold text-center text-lg">Analyze Problem</Text>
        )}
      </TouchableOpacity>

      {!isLoading && (images.length > 0 || textQuery.length > 0) && (
        <TouchableOpacity className="bg-red-500 py-4 rounded-xl w-full mb-10" onPress={clearAll}>
          <Text className="text-white font-bold text-center">Clear All</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}