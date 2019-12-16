import React, {useEffect, useState} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {Button, Text} from 'native-base';

import TodosList from '../components/TodosList';
import AddTodoInput from '../components/AddTodoInput';
import firebase from "../../firebase";
import showToast, {ToastType} from "../utils/showToast";

export interface ITodo {
  id: number;
  name: string;
  done: boolean;
  created_at: string;
}

const dbh = firebase.firestore();

export default function TodoScreen(): JSX.Element {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async (): Promise<void> => {
    const storedTodos = await AsyncStorage.getItem('todos');

    const data = await firebase.auth().currentUser;

    dbh.collection('tasks').where('userUID', '==', data.uid).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        switch (change.type) {
          case "added":
            setTodos([...todos, change.doc]);
            break;
          case "modified":
            const todosToKeep = todos.filter(t => t.id !== change.doc.id);
            setTodos([...todosToKeep, change.doc]);
            break;
          case "removed":
            setTodos(todos.filter(t => t.id !== change.doc.id));
            break;
        }
      });
    });

    setTodos(JSON.parse(storedTodos) || []);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (): Promise<void> => {
    if (todos.filter((existingTodo: ITodo) => existingTodo.name === text).length > 0) {
      alert('This todo already exists');

      return;
    }

    try {
      const currentUser = await firebase.auth().currentUser;

      await dbh.collection('tasks').add({
        name: text,
        done: false,
        created_at: new Date(),
        userUID: currentUser.uid,
      });

      setText('');

      showToast(ToastType.SUCCESS, 'Todo Added !');
    } catch (e) {
      showToast(ToastType.ERROR, e.message);
    }
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

  const deleteAllTodos = async (): Promise<void> => {
    // @Todo
    // try {
    //   const currentUser = await firebase.auth().currentUser;
    //
    //   const docs = await dbh.collection('tasks').where('userUID', '==', currentUser.uid).get();
    //
    //   docs.forEach(doc => doc.remove());
    //
    //   showToast(ToastType.SUCCESS, 'All Todos deleted !');
    // } catch (e) {
    //   showToast(ToastType.ERROR, e.message);
    // }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    await dbh.collection('tasks').doc(id).delete();

    showToast(ToastType.SUCCESS, 'Deleted 1 Todo !');
  };

  const todoToggleDone = async (id: string): Promise<void> => {
    const currentDone = todos.find(t => t.id === id).done;

    await dbh.collection('tasks').doc(id).set({
      done: !currentDone,
    });

    showToast(ToastType.SUCCESS, `Todo ${currentDone ? 'undone' : 'done'}`);
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
