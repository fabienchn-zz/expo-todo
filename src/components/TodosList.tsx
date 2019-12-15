import React from "react";
import { Body, Button, CheckBox, ListItem, Right, Text } from "native-base";
import { StyleSheet } from "react-native";

import { ITodo } from '../../App';

interface IProps {
  todos: ITodo[];
  todoToggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodosList = ({ todos, todoToggleDone, deleteTodo }: IProps): JSX.Element => (
  <>
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
  </>
);

const styles = StyleSheet.create({
  strikedText: {
    textDecorationLine: 'line-through',
  },
});

export default TodosList;
