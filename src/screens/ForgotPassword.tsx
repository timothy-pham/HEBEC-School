import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import {AuthContext} from '../contexts/AuthContext';

//components
import Logo from '../components/Logo';
import TextField from '../components/TextField';
import MiniText from '../components/MiniText';
import ButtonCustom from '../components/ButtonCustom';
import CountDownTimer from '../components/Timer';
import theme from '../core/theme';
import CountDown from '../components/Timer';

const ForgotPassword = () => {
  type forgotPasswordScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
  >;
  const navigation = useNavigation<forgotPasswordScreenProp>();
  const value = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    'Vui lòng nhập địa chỉ email liên kết với tài khoản của bạn để lấy lại mật khẩu.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [button, setButton] = useState('Gửi');
  const [error, setError] = useState('');

  const [inputValue, setInputValue] = useState(
    <View style={styles.textField}>
      <TextField
        label="Email"
        placeholder="Nhập địa chỉ email"
        onChangeText={setEmail}
      />
    </View>,
  );

  //countdown
  const handleForgotPassword = () => {
    setIsLoading(true);
    setMessage(
      'Hệ thống HEBEC đã gửi cho bạn email khôi phục mật khẩu. Vui lòng kiểm tra email của bạn và làm theo hướng dẫn. Xin cảm ơn!',
    );
    setButton('Trở về');
    setInputValue(<CountDownTimer />);
  };
  const renderButton = () => {
    if (isLoading) {
      return (
        <View style={styles.loginButton}>
          <ButtonCustom
            title="Trở về"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.loginButton}>
          <ButtonCustom title="Gửi" onPress={handleForgotPassword} />
        </View>
      );
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Image source={require('../assets/icons/Close.png')} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>QUÊN MẬT KHẨU</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        {inputValue}
        {renderButton()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 29,
    color: theme.colors.green,
  },
  message: {
    marginHorizontal: 20,
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    textAlign: 'center',
    color: theme.colors.darkGrey,
    marginTop: 50,
  },
  textField: {
    marginTop: 20,
  },
  resend: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResend: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    color: theme.colors.green,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default ForgotPassword;
