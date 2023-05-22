import {
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

export interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  onPress: ((evnet: GestureResponderEvent) => void) | undefined;
  textStyles?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}
