import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type SeparatorProps = {
  style?: StyleProp<ViewStyle>;
};

export default function Separator({ style }: SeparatorProps) {
  return <View style={[styles.separator, style]}></View>;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
  },
});
