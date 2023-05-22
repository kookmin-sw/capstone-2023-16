import React, {FC} from 'react';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

interface KeyboardAvoidingViewContainerProps {
  children: React.ReactNode;
}

const KeyboardAvoidingViewContainer: FC<
  KeyboardAvoidingViewContainerProps
> = props => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        margin: 15,
      }}
      keyboardVerticalOffset={60}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props.children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingViewContainer;
