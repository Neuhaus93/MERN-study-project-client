import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { cache } from '../cache';
import { auth } from '../services/firebase';
import { User, useUserLazyQuery } from '../graphql/__generated__';

interface AuthContextProps {
  mongoUser: User | null | undefined;
  currentUser: firebase.User | null | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
}

export const AuthContext = React.createContext<AuthContextProps>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [getUser, { data }] = useUserLazyQuery();
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [mongoUser, setMongoUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    if (mongoUser && mongoUser._id) {
      cache.evict({ id: `User:${mongoUser._id}` });
      cache.gc();
    }
    setMongoUser(null);
    localStorage.removeItem('@token');

    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    return currentUser?.updateEmail(email);
  }

  function updatePassword(password: string) {
    return currentUser?.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const token = await user?.getIdToken(true);
      if (token) {
        localStorage.setItem('@token', token);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Query the user based on the firebaseID
  useEffect(() => {
    if (currentUser) {
      getUser({ variables: { firebaseId: currentUser.uid } });
    }
  }, [currentUser, getUser]);

  // If a user is queried, set to the mongoUser variable
  useEffect(() => {
    if (data) {
      setMongoUser(data.user);
    } else {
      setMongoUser(null);
    }
  }, [data]);

  const value = {
    mongoUser,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
