// Import global CSS for NativeWind v4
import "./global.css";
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-2xl font-bold text-green-700">AgroGuard AI</Text>
      <Text className="text-base text-gray-600 mt-2">Tailwind CSS is working!</Text>
    </View>
  );
}