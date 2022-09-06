import React, {useContext, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

//components
import TextField from '../components/TextField';
import ButtonCustom from '../components/ButtonCustom';

import {updatePassword} from '../api/Profile';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordHandler = () => {
    if (oldPassword.length == 0) {
      Alert.alert('Thông báo', 'Bạn phải nhập mật khẩu cũ');
      return;
    }
    if (password.length == 0) {
      Alert.alert('Thông báo', 'Bạn phải nhập mật khẩu mới');
      return;
    }
    if (password != confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu không khớp');
      return;
    }

    updatePassword({
      oldPassword: oldPassword,
      newPassword: confirmPassword,
    })
      .then(res => {
        if (res.status == false) {
          Alert.alert('Thông báo', res.message);
        } else {
          Alert.alert(
            'Thông báo',
            'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.',
          );
        }
      })
      .catch(err => {
        Alert.alert('Thông báo', err.message);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.textField}>
        <TextField
          value={oldPassword}
          label="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          onChangeText={setOldPassword}
          isPassword={true}
        />
      </View>
      <View style={styles.textField}>
        <TextField
          value={password}
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          onChangeText={setPassword}
          isPassword={true}
        />
      </View>
      <View style={styles.textField}>
        <TextField
          value={confirmPassword}
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          onChangeText={setConfirmPassword}
          isPassword={true}
        />
      </View>
      <View style={styles.loginButton}>
        <ButtonCustom title="Lưu" onPress={updatePasswordHandler} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  textField: {
    marginTop: 20,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default ChangePassword;
