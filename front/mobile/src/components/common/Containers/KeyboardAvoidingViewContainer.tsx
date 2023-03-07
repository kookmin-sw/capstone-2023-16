import React, { FC } from "react";

import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

interface KeyboardAvoidingViewContainerProps {
  children: React.ReactNode;
}

const KeyboardAvoidingViewContainer: FC<KeyboardAvoidingViewContainerProps> = (
  props
) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "transparent", padding: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {props.children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingViewContainer;
