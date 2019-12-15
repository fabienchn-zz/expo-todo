import { Body, Button, Input, Item, Right, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface IProps {
  text: string;
  setText: (text: string) => void;
  addTodo: () => void;
}

const AddTodoInput = ({ text, setText, addTodo }: IProps): JSX.Element => (
  <Item last>
    <Body>
      <Input
        value={text}
        placeholder="New todo..."
        onChangeText={(text: string) => setText(text)}
        style={styles.input}
        onSubmitEditing={addTodo}
      />
    </Body>
    <Right>
      <Button onPress={addTodo} disabled={text === ''}>
        <Text>Add</Text>
      </Button>
    </Right>
  </Item>
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
  },
});

export default AddTodoInput;
