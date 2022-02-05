import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = ReturnType<typeof useAuthValues>;

const USER_COLLECTION = "@gopizza:users";

export const AuthContext = createContext({} as AuthContextData);

function useAuthValues() {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha");
    }

    setIsLogging(true);

    try {
      const account = await auth().signInWithEmailAndPassword(email, password);

      if (account) {
        try {
          const profile = await firestore()
            .collection("users")
            .doc(account.user.uid)
            .get();

          const { name, isAdmin } = profile.data() as User;

          if (profile.exists) {
            const userData = {
              id: account.user.uid,
              name,
              isAdmin,
            };

            setUser(userData);

            AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
          }

          setIsLogging(false);
        } catch (err) {
          console.log("erro", err);
          setIsLogging(false);

          return Alert.alert("Login", "Não foi possível realizar o login");
        }
      }
    } catch (err: any) {
      console.log("ërro", err);

      setIsLogging(false);

      const { code } = err;

      if (code === "auth/user-not-found" || code === "auth/wrong-password") {
        return Alert.alert("Login", "E-mail e/ou senha inválida");
      } else {
        return Alert.alert("Login", "Não foi possível realizar o login");
      }
    }
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinir senha", "Informe o e-mail");
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          "Redefinir senha",
          "Enviamos um link no seu e-mail para redefinir sua senha"
        )
      )
      .catch(() =>
        Alert.alert(
          "Redefinir senha",
          "Não foi possível enviar o e-mail para redefinir a senha"
        )
      );
  }

  async function loadUserStorageData() {
    try {
      setIsLogging(true);

      const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

      console.log("a", storedUser);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setIsLogging(false);
    } catch (err) {
      setIsLogging(false);
      console.log("ërr", err);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return {
    isLogging,
    setIsLogging,
    signIn,
    user,
    signOut,
    forgotPassword,
  };
}

export const AuthProvider: React.FC = ({ children }) => {
  const values = useAuthValues();
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
