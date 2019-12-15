import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button, H1, Form, Item, Input, Grid, Col } from 'native-base';
import firebase from 'firebase';

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState('fabiencohen96@gmail.com');
  const [password, setPassword] = useState('Henridu13.');

  const handleSignIn = async () => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
    } catch(error) {
      alert(`${error.code}: ${error.message}`);
    }
  };

  const handleSignUp = async () => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch(error) {
      alert(`${error.code}: ${error.message}`);
    }
  };

  return (
    <>
      <H1>Login</H1>

      <Form>
        <Item>
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
        </Item>
        <Item last>
          <Input
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </Item>

        <Grid>
          <Col>
            <Button onPress={handleSignIn} bordered>
              <Text>Sign in</Text>
            </Button>
          </Col>
          <Col>
            <Button onPress={handleSignUp}>
              <Text>Sign up</Text>
            </Button>
          </Col>
        </Grid>
      </Form>
    </>
  );
}
