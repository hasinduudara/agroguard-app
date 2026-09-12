import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function CameraScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-2xl font-bold text-white mb-6">Camera View</Text>
      
      {/* Button to go back to the Home Screen */}
      <TouchableOpacity 
        className="bg-gray-700 px-6 py-3 rounded-full"
        onPress={function() { navigation.goBack(); }}
      >
        <Text className="text-white font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}