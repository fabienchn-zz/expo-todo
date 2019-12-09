import React, { useState, useEffect } from 'react';
import {StyleSheet, AsyncStorage, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root, Toast, Container, Input, Item, Content, Header, Title, Right, Body, ListItem, Text, CheckBox, Button } from 'native-base';

interface ITodo {
  id: number;
  name: string;
  done: boolean;
}

export default function App(): JSX.Element {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showToast] = useState(false);

  const loadDependencies = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    setLoaded(true);
  };

  const fetchTodos = async (): Promise<void> => {
    const storedTodos = await AsyncStorage.getItem('todos');

    setTodos(JSON.parse(storedTodos) || []);
  };

  useEffect(() => {
    loadDependencies();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setText('blabla');
  }, []);

  if (!loaded) {
    return (<AppLoading />);
  }

  const addTodo = (): void => {
    if (todos.filter((existingTodo: ITodo) => existingTodo.name === text).length > 0) {
      alert('This todo already exists');

      return;
    }

    const newTodo: ITodo = {
      id: new Date().getTime(),
      name: text,
      done: false,
    };

    setTodos([...todos, newTodo]);

    AsyncStorage.setItem('todos', JSON.stringify(todos));

    Toast.show({
      text: "Todo Added !",
      buttonText: "Okay",
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
    });
  };

  const confirmDeleteAllTodos = (): void => {
    Alert.alert(
      'Deleting All Todos',
      'Do you really want to delete all todos ?',
      [
        {text: 'no' },
        {text: 'yes', onPress: () => deleteAllTodos()},
      ]
    );
  };

  const deleteAllTodos = (): void => {
    setTodos([]);

    AsyncStorage.setItem('todos', JSON.stringify([]));

    Toast.show({
      text: "All Todos deleted !",
      buttonText: "Okay",
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
    });
  };

  const deleteTodo = (id: number): void => {
    const todosToKeep = todos.filter((existingTodo: ITodo) => existingTodo.id !== id);

    setTodos(todosToKeep);

    AsyncStorage.setItem('todos', JSON.stringify(todosToKeep));

    Toast.show({
      text: "Deleted 1 Todo !",
      buttonText: "Okay",
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
    });
  };

  const todoToggleDone = (id: number): void => {
    const newTodos = todos.map((existingTodo: ITodo) => (
        existingTodo.id === id ? {...existingTodo, done: !existingTodo.done} :  existingTodo
    ));

    setTodos(newTodos);

    AsyncStorage.setItem('todos', JSON.stringify(newTodos));

    Toast.show({
      text: "Todo done/undone !",
      buttonText: "Okay",
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
    });
  };

  return (
    <Root>
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title>Expo Todo</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Button onPress={confirmDeleteAllTodos} disabled={text === ''} danger>
            <Text>Delete All Todos</Text>
          </Button>

          <Item last>
            <Input
                value={text}
                placeholder="New todo..."
                onChangeText={(text: string) => setText(text)}
                style={styles.textArea}
            />
          </Item>

          <Button onPress={addTodo} disabled={text === ''}>
            <Text>Add</Text>
          </Button>

          {todos.map((todo: ITodo): JSX.Element => (
              <ListItem key={todo.id}>
                <CheckBox checked={todo.done} onPress={() => todoToggleDone(todo.id)} />
                <Body>
                  <Text style={todo.done ? styles.strikedText : null}>{todo.name}</Text>
                </Body>
                <Right>
                  <Button onPress={() => deleteTodo(todo.id)} transparent dark bordered small>
                    <Text>X</Text>
                  </Button>
                </Right>
              </ListItem>
          ))}
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 30,
  },
  textArea: {
    width: '100%',
  },
  strikedText: {
    textDecorationLine: 'line-through',
  },
});
