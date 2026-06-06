import { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';

export default function AuthScreen() {
  const router = useRouter();
  const loginAction = useGameStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleAuth = async () => {
    setErrorMsg('');
    
    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await login(email, password);
        if (res.success && res.user) {
          loginAction(res.user.name, res.user.email);
          router.replace('/(tabs)');
        } else {
          setErrorMsg(res.error || 'Login failed.');
        }
      } else {
        const res = await register(name, email, password);
        if (res.success) {
          // Auto-login after successful registration
          loginAction(name, email.trim().toLowerCase());
          router.replace('/(tabs)');
        } else {
          setErrorMsg(res.error || 'Registration failed.');
        }
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
        <View className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <Text className="text-4xl font-black text-blue-600 mb-2 text-center">NetPath</Text>
          <Text className="text-slate-500 text-center mb-8 text-lg">Learn Computer Networking</Text>

          <View className="flex-row bg-slate-100 rounded-xl p-1 mb-8">
            <Pressable 
              onPress={() => { setIsLogin(false); setErrorMsg(''); }}
              className={`flex-1 py-3 rounded-lg items-center ${!isLogin ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`font-semibold ${!isLogin ? 'text-blue-600' : 'text-slate-500'}`}>Sign Up</Text>
            </Pressable>
            <Pressable 
              onPress={() => { setIsLogin(true); setErrorMsg(''); }}
              className={`flex-1 py-3 rounded-lg items-center ${isLogin ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`font-semibold ${isLogin ? 'text-blue-600' : 'text-slate-500'}`}>Login</Text>
            </Pressable>
          </View>

          {errorMsg ? (
            <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4">
              <Text className="text-red-600 text-center font-medium">{errorMsg}</Text>
            </View>
          ) : null}

          <View className="gap-4">
            {!isLogin && (
              <View>
                <Text className="text-slate-700 font-medium mb-2">Full Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  editable={!isLoading}
                />
              </View>
            )}

            <View>
              <Text className="text-slate-700 font-medium mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                editable={!isLoading}
              />
            </View>

            <View>
              <Text className="text-slate-700 font-medium mb-2">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                editable={!isLoading}
              />
            </View>

            <Pressable 
              onPress={handleAuth}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl items-center mt-4 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 active:bg-blue-700'}`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">{isLogin ? 'Login' : 'Sign Up'}</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
