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
        
        {/* Added px-6 for side spacing */}
        <View className="flex-1 bg-gray-100 items-center justify-center px-6">
          
          {/* Added text-center to align multi-line text perfectly */}
          <Text className="text-3xl font-bold text-green-700 text-center leading-tight">
            {t('welcomeMessage')}
          </Text>
          
          <Text className="text-base text-gray-600 mt-4 text-center">
            {t('subtitle')}
          </Text>

          <TouchableOpacity 
            className="mt-10 bg-green-700 px-8 py-3 rounded-full shadow-sm"
            onPress={toggleLanguage}
          >
            <Text className="text-white font-semibold text-lg">
              {t('changeLanguage')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}