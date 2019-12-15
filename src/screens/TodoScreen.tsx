import React, { useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Toast, Text, Button } from 'native-base';

import TodosList from '../components/TodosList';
import AddTodoInput from '../components/AddTodoInput';

export interface ITodo {
  id: number;
  name: string;
  done: boolean;
}

export default function TodoScreen(): JSX.Element {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async (): Promise<void> => {
    const storedTodos = await AsyncStorage.getItem('todos');

    setTodos(JSON.parse(storedTodos) || []);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
    setText('');

    AsyncStorage.setItem('todos', JSON.stringify(todos));

    Toast.show({
      text: 'Todo Added !',
      buttonText: 'Okay',
      buttonTextStyle: { color: '#008000' },
      buttonStyle: { backgroundColor: '#5cb85c' },
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
      text: 'All Todos deleted !',
      buttonText: 'Okay',
      buttonTextStyle: { color: '#008000' },
      buttonStyle: { backgroundColor: '#5cb85c' },
    });
  };

  const deleteTodo = (id: number): void => {
    const todosToKeep = todos.filter((existingTodo: ITodo) => existingTodo.id !== id);

    setTodos(todosToKeep);

    AsyncStorage.setItem('todos', JSON.stringify(todosToKeep));

    Toast.show({
      text: 'Deleted 1 Todo !',
      buttonText: 'Okay',
      buttonTextStyle: { color: '#008000' },
      buttonStyle: { backgroundColor: '#5cb85c' },
    });
  };

  const todoToggleDone = (id: number): void => {
    const newTodos = todos.map((existingTodo: ITodo) => (
      existingTodo.id === id ? {...existingTodo, done: !existingTodo.done} :  existingTodo
    ));

    setTodos(newTodos);

    AsyncStorage.setItem('todos', JSON.stringify(newTodos));

    Toast.show({
      text: 'Todo done/undone !',
      buttonText: 'Okay',
      buttonTextStyle: { color: '#008000' },
      buttonStyle: { backgroundColor: '#5cb85c' },
    });
  };

  return (
    <>
      <AddTodoInput text={text} setText={setText} addTodo={addTodo} />
      <TodosList
        todos={todos}
        todoToggleDone={todoToggleDone}
        deleteTodo={deleteTodo}
      />

      {todos.length > 0 && (
        <Button onPress={confirmDeleteAllTodos} danger small>
          <Text>Delete All Todos</Text>
        </Button>
      )}
    </>
  );
}
