import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

// Define the navigation prop type for the Home Screen
export default function HomeScreen({ navigation }: any) {
  const { t, i18n } = useTranslation();

  // Function to toggle between Sinhala and English
  function toggleLanguage() {
    const nextLanguage = i18n.language === 'si' ? 'en' : 'si';
    i18n.changeLanguage(nextLanguage);
  }

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center px-6">
      <Text className="text-3xl font-bold text-green-700 text-center leading-tight">
        {t('welcomeMessage')}
      </Text>
      
      <Text className="text-base text-gray-600 mt-4 text-center">
        {t('subtitle')}
      </Text>

      {/* Button to navigate to the Camera Screen */}
      <TouchableOpacity 
        className="mt-8 bg-green-700 px-8 py-3 rounded-full shadow-sm w-full"
        onPress={function() { navigation.navigate('Camera'); }}
      >
        <Text className="text-white font-semibold text-lg text-center">
          Open Camera
        </Text>
      </TouchableOpacity>

      {/* Language Toggle Button */}
      <TouchableOpacity 
        className="mt-4 border-2 border-green-700 px-8 py-3 rounded-full w-full"
        onPress={toggleLanguage}
      >
        <Text className="text-green-700 font-semibold text-lg text-center">
          {t('changeLanguage')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}