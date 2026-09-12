import "./global.css";
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

// Initialize i18n configuration
import './src/locales/i18n';

export default function App() {
  const { t, i18n } = useTranslation();

  // Function to toggle between Sinhala and English
  function toggleLanguage() {
    const nextLanguage = i18n.language === 'si' ? 'en' : 'si';
    i18n.changeLanguage(nextLanguage);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar style="light" />
        
        <View className="flex-1 bg-gray-100 items-center justify-center">
          <Text className="text-2xl font-bold text-green-700">
            {t('welcomeMessage')}
          </Text>
          <Text className="text-base text-gray-600 mt-2 text-center px-4">
            {t('subtitle')}
          </Text>

          {/* Language Toggle Button */}
          <TouchableOpacity 
            className="mt-8 bg-green-700 px-6 py-3 rounded-full"
            onPress={toggleLanguage}
          >
            <Text className="text-white font-semibold">
              {t('changeLanguage')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}