import {Button} from '@react-native-material/core';
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../core/theme';
type button = {
  title: string;
  onPress: () => void;
};

const ButtonCustom = ({title, onPress}: button) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    backgroundColor: theme.colors.green,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: 'white',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: 'white',
  },
});

export default ButtonCustom;
