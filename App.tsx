import "./global.css";
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    // SafeAreaProvider manages the safe area boundaries for the app
    <SafeAreaProvider>
      {/* 
        SafeAreaView with bg-black ensures the top notch and bottom navigation 
        areas are black. 
      */}
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar style="light" />
        
        {/* Main Application Container */}
        <View className="flex-1 bg-gray-100 items-center justify-center">
          <Text className="text-2xl font-bold text-green-700">AgroGuard AI</Text>
          <Text className="text-base text-gray-600 mt-2">Ready for Multi-Language Support!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}