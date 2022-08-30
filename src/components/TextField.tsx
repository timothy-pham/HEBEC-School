import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import theme from '../core/theme';

type textField = {
  label: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: undefined;
  isPassword?: boolean;
};

const TextField = ({
  label,
  onChangeText,
  placeholder,
  isPassword = false,
}: textField) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        underlineColorAndroid="transparent"
        selectionColor={theme.colors.green}
        secureTextEntry={isPassword}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.mediumGrey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: theme.colors.darkGrey,
    marginBottom: 5,
  },
  textInput: {
    justifyContent: 'flex-start',
    height: 50,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    borderColor: theme.colors.mediumGrey,
    color: theme.colors.darkGrey,
  },
});

export default TextField;
