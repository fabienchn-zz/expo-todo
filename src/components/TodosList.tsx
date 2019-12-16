import React from "react";
import { Body, Button, CheckBox, ListItem, Right, Text } from "native-base";
import { StyleSheet } from "react-native";

interface IProps {
  todos: any[];
  todoToggleDone: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodosList = ({ todos, todoToggleDone, deleteTodo }: IProps): JSX.Element => (
  <>
    {todos.map((todo): JSX.Element => (
      <ListItem key={todo.id}>
        <CheckBox checked={todo.data().done} onPress={() => todoToggleDone(todo.id)} />
        <Body>
          <Text style={todo.data().done ? styles.strikedText : null}>
            {todo.data().name}
          </Text>
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
