import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '../../store/gameStore';

export default function DashboardScreen() {
  const user = useGameStore((state) => state.user);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      className="bg-slate-50"
      contentContainerStyle={{ 
        flexGrow: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 24,
        paddingTop: 24
      }}
    >
      <View className="items-center mb-8">
        <Text className="text-4xl font-bold text-blue-600 mb-2">NetPath</Text>
        <Text className="text-slate-500 text-lg">Welcome back, {user?.name || "Student"}!</Text>
      </View>

      <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full max-w-sm items-center">
        <Text className="text-2xl font-semibold text-slate-800 mb-4">Ready to Learn?</Text>
        <Text className="text-slate-500 text-center mb-6">
          Begin your journey through computer networking concepts. Complete levels sequentially to unlock new challenges.
        </Text>

        <Pressable
          onPress={() => router.navigate('/(tabs)/map')}
          className="w-full py-4 rounded-xl bg-blue-600 items-center"
        >
          <Text className="text-white font-semibold text-lg">Start Learning</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
