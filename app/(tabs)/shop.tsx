import { View, Text, Pressable, ScrollView } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useGameStore } from '../../store/gameStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useHeartRegen } from '../../src/hooks/useHeartRegen';

export default function ShopScreen() {
  const { xp, hearts, maxHearts, buyHeart, buyFullRefill } = useGameStore();
  const insets = useSafeAreaInsets();
  const { formattedTime } = useHeartRegen();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBuyHeart = () => {
    setErrorMsg('');
    setSuccessMsg('');
    const res = buyHeart(50);
    if (res.success) {
      setSuccessMsg('Successfully bought 1 Heart!');
      setTimeout(() => setSuccessMsg(''), 2000);
    } else {
      setErrorMsg(res.error || 'Failed to buy heart.');
      setTimeout(() => setErrorMsg(''), 2000);
    }
  };

  const handleBuyFullRefill = () => {
    setErrorMsg('');
    setSuccessMsg('');
    const res = buyFullRefill(200);
    if (res.success) {
      setSuccessMsg('Successfully refilled all Hearts!');
      setTimeout(() => setSuccessMsg(''), 2000);
    } else {
      setErrorMsg(res.error || 'Failed to refill hearts.');
      setTimeout(() => setErrorMsg(''), 2000);
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: insets.bottom + 40, paddingTop: 40 }}
    >
      <View className="items-center px-6">
        <View className="bg-white p-6 rounded-3xl w-full max-w-sm items-center shadow-sm border border-slate-100 mb-8">
          <Text className="text-slate-500 font-medium mb-2">Your Balance</Text>
          <View className="flex-row items-center gap-2 mb-4">
            <Text className="text-yellow-500 font-bold text-3xl">⚡</Text>
            <Text className="text-slate-800 font-black text-4xl">{xp} XP</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-red-500 font-bold text-xl">❤️</Text>
            <Text className="text-slate-600 font-bold text-xl">
              {hearts} / {maxHearts}
            </Text>
          </View>
          {formattedTime && (
            <Text className="text-slate-400 font-medium mt-2">Next heart in {formattedTime}</Text>
          )}
        </View>

        {errorMsg ? (
          <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-6 w-full max-w-sm">
            <Text className="text-red-600 text-center font-medium">{errorMsg}</Text>
          </View>
        ) : null}

        {successMsg ? (
          <View className="bg-green-50 border border-green-200 p-3 rounded-xl mb-6 w-full max-w-sm">
            <Text className="text-green-600 text-center font-medium">{successMsg}</Text>
          </View>
        ) : null}

        <View className="w-full max-w-sm gap-4">
          <Text className="text-xl font-bold text-slate-800 mb-2">Store Items</Text>
          
          <Pressable 
            onPress={handleBuyHeart}
            className="bg-white p-5 rounded-2xl flex-row items-center justify-between shadow-sm border border-slate-100 active:bg-slate-50"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center">
                <Heart color="#ef4444" fill="#ef4444" size={24} />
              </View>
              <View>
                <Text className="font-bold text-lg text-slate-800">1 Heart</Text>
                <Text className="text-slate-500">Restore a single life</Text>
              </View>
            </View>
            <View className="bg-slate-100 px-4 py-2 rounded-xl">
              <Text className="font-bold text-slate-700">50 XP</Text>
            </View>
          </Pressable>

          <Pressable 
            onPress={handleBuyFullRefill}
            className="bg-white p-5 rounded-2xl flex-row items-center justify-between shadow-sm border border-slate-100 active:bg-slate-50"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center flex-row">
                <Heart color="#ef4444" fill="#ef4444" size={24} />
              </View>
              <View>
                <Text className="font-bold text-lg text-slate-800">Full Refill</Text>
                <Text className="text-slate-500">Restore to 5 Hearts</Text>
              </View>
            </View>
            <View className="bg-slate-100 px-4 py-2 rounded-xl">
              <Text className="font-bold text-slate-700">200 XP</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
