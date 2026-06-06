import { Tabs, useRouter } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { LogOut, Map as MapIcon, Home, ShoppingCart } from 'lucide-react-native';
import { useGameStore } from '../../store/gameStore';
import { useHeartRegen } from '../../src/hooks/useHeartRegen';

export default function TabLayout() {
  const { logout, xp, hearts } = useGameStore();
  const router = useRouter();
  const { formattedTime } = useHeartRegen();

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb', // blue-600
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: '',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          headerLeft: () => (
            <View className="flex-row items-center ml-5 gap-4">
              <Pressable onPress={() => router.push('/(tabs)/shop')} className="flex-row items-center gap-1.5 p-2 active:opacity-50">
                <Text className="text-yellow-500 font-bold text-lg">⚡</Text>
                <Text className="font-bold text-slate-700 text-base">{xp} XP</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/(tabs)/shop')} className="flex-row items-center gap-1.5 p-2 active:opacity-50">
                <Text className="text-red-500 font-bold text-lg">❤️</Text>
                <Text className="font-bold text-slate-700 text-base">
                  {hearts}
                  {formattedTime ? <Text className="text-slate-400 text-sm"> ({formattedTime})</Text> : null}
                </Text>
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={handleLogout} className="mr-3 p-2 active:opacity-50">
              <LogOut size={22} color="#64748b" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Learning Map',
          headerTitle: '',
          tabBarIcon: ({ color }) => <MapIcon color={color} size={24} />,
          headerLeft: () => (
            <View className="flex-row items-center ml-5 gap-4">
              <Pressable onPress={() => router.push('/(tabs)/shop')} className="flex-row items-center gap-1.5 p-2 active:opacity-50">
                <Text className="text-yellow-500 font-bold text-lg">⚡</Text>
                <Text className="font-bold text-slate-700 text-base">{xp} XP</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/(tabs)/shop')} className="flex-row items-center gap-1.5 p-2 active:opacity-50">
                <Text className="text-red-500 font-bold text-lg">❤️</Text>
                <Text className="font-bold text-slate-700 text-base">
                  {hearts}
                  {formattedTime ? <Text className="text-slate-400 text-sm"> ({formattedTime})</Text> : null}
                </Text>
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={handleLogout} className="mr-3 p-2 active:opacity-50">
              <LogOut size={22} color="#64748b" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          headerTitle: '',
          tabBarIcon: ({ color }) => <ShoppingCart color={color} size={24} />,
          headerLeft: () => (
            <View className="flex-row items-center ml-5 gap-4">
              <Pressable onPress={() => router.push('/(tabs)/shop')} className="flex-row items-center gap-1.5 p-2 active:opacity-50">
                <Text className="text-yellow-500 font-bold text-lg">⚡</Text>
                <Text className="font-bold text-slate-700 text-base">{xp} XP</Text>
              </Pressable>
              <View className="flex-row items-center gap-1.5 p-2">
                <Text className="text-red-500 font-bold text-lg">❤️</Text>
                <Text className="font-bold text-slate-700 text-base">
                  {hearts}
                  {formattedTime ? <Text className="text-slate-400 text-sm"> ({formattedTime})</Text> : null}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={handleLogout} className="mr-3 p-2 active:opacity-50">
              <LogOut size={22} color="#64748b" />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
