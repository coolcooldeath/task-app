import React, { useRef } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { createStyles } from "../styles/CreateScreen.styles";

type Props = {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  onAdd: () => void;
};

export default function CreateScreen({
  title,
  setTitle,
  description,
  setDescription,
  address,
  setAddress,
  onAdd,
}: Props) {
  //  focus between fields and blur when closing keyboard
  const descriptionRef = useRef<TextInput | null>(null);
  const addressRef = useRef<TextInput | null>(null);

  return (
    // allow tapping outside to dismiss keyboard and blur inputs
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // dismiss keyboard and remove focus from inputs
          descriptionRef.current?.blur();
          addressRef.current?.blur();
        }}
      >
        <View style={createStyles.form}>
          <Text style={createStyles.fieldLabel}>Title (required)</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[createStyles.input, createStyles.inputSmall]}
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()} // move focus to description
            blurOnSubmit={false}
          />

          <Text style={createStyles.fieldLabel}>Description (required)</Text>
          <TextInput
            ref={descriptionRef}
            value={description}
            onChangeText={setDescription}
            style={[createStyles.input, createStyles.inputLarge]}
            multiline
            textAlignVertical="top"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() => addressRef.current?.focus()} // move focus to address
          />

          <Text style={createStyles.fieldLabel}>Address (required)</Text>
          <TextInput
            ref={addressRef}
            value={address}
            onChangeText={setAddress}
            style={[createStyles.input, createStyles.inputSmall]}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss(); // done -> dismiss
              addressRef.current?.blur();
            }}
          />

          <Button title="Add Task" onPress={onAdd} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}