import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default function LoadingScreen({ navigation }): JSX.Element {
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('TodoScreen');
      } else {
        navigation.navigate('LoginScreen');
      }
    })
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <>
      <ActivityIndicator size="large" />
    </>
  );
}
