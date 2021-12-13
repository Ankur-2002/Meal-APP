import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DefaultText = ({ children }) => {
  return <Text style={Styles.Text}>{children}</Text>;
};
const Styles = StyleSheet.create({
  Text: {
    fontFamily: 'open-sans-bold',
    alignItems: 'center',
    fontSize: 16,
  },
});
export default DefaultText;
