import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function ResultScreen({ route, navigation }: any) {
  const { advice } = route.params;

  return (
    <View className="flex-1 bg-gray-100 p-4 pt-10">
      <ScrollView 
        className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-200"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-green-800 mb-6 text-center">
          Analysis Result
        </Text>
        
        {/* Render the Markdown content to support bold text, tables, and lists */}
        <Markdown>
          {advice}
        </Markdown>
        
        <View className="h-10" />
      </ScrollView>

      <TouchableOpacity 
        className="bg-green-700 py-4 rounded-xl w-full mt-4"
        onPress={function() { navigation.goBack(); }}
      >
        <Text className="text-white font-bold text-center text-lg">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}