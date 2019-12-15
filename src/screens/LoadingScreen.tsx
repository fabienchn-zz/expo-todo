import React, {useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default function LoadingScreen({ navigation }): JSX.Element {
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);

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
