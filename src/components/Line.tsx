import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../core/theme';

const Line = () => {
  return (
    <View
      style={{
        borderBottomColor: theme.colors.grey,
        borderBottomWidth: 1,
      }}
    />
  );
};

export default Line;
