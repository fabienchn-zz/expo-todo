import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import firebase from 'firebase';
import '@firebase/firestore';
import { Root, Container, Content, Header, Title, Right, Body, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import ignoreWarnings from 'react-native-ignore-warnings';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { firebaseConfig } from "./config";
import TodoScreen from "./src/screens/TodoScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";

ignoreWarnings('Setting a timer');

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbh = firebase.firestore();

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  TodoScreen: TodoScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App(): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  const loadDependencies = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    setLoaded(true);
  };

  useEffect(() => {
    loadDependencies();
  }, []);

  if (!loaded) {
    return (<AppLoading />);
  }

  const logout = () => {
    try {
      firebase.auth().signOut()
    } catch(error) {
      alert(`${error.code}: ${error.message}`);
    }
  };

  return (
    <Root>
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title>Expo Todo</Title>
          </Body>
          <Right>
            <Icon name="logout" onPress={logout} />
          </Right>
        </Header>

        <Content padder>
          <AppNavigator />
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 30,
  }
});
