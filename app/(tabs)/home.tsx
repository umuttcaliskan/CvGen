import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { getAuth, User } from 'firebase/auth';

const HomeScreen: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>('');

  useEffect(() => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text>Hoşgeldiniz , {userEmail}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
