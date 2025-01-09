import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { firebase } from '../firebaseConfig';

interface UserData {
  fullName?: string;
  email?: string;
  birthDate?: string;
  // Diğer kullanıcı bilgilerini buraya ekleyebilirsiniz
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  isLoading: true,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await firebase.firestore()
        .collection('users')
        .doc(userId)
        .get();

      if (userDoc.exists) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshUserData = async () => {
    if (user?.uid) {
      await fetchUserData(user.uid);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, isLoading, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
} 