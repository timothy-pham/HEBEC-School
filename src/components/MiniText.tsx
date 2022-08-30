import React from 'react';
import {Text, StyleSheet} from 'react-native';
import theme from '../core/theme';

type miniText = {
  text: string;
};

const MiniText = ({text}: miniText) => {
  return <Text style={styles.miniText}>{text}</Text>;
};

const styles = StyleSheet.create({
  miniText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: theme.colors.green,
  },
});

export default MiniText;
