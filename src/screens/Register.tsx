import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';

//components
import TextField from '../components/TextField';
import MiniText from '../components/MiniText';
import ButtonCustom from '../components/ButtonCustom';
import theme from '../core/theme';
import {register} from '../api/Auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  type loginScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'Register'
  >;
  const navigation = useNavigation<loginScreenProp>();

  const handleRegister = () => {
    setIsLoading(true);
    if (username.length == 0) {
      Alert.alert('Thông báo', 'Bạn phải nhập tên đăng nhập');
      return;
    }
    if (password != confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu không khớp');
      return;
    }
    register({
      customer: {
        username: username,
        password: confirmPassword,
        phone: username,
        name: fullname,
        address: '',
        email: '',
        gender: '',
      },
      facebookId: '',
      zaloId: '',
      googleId: '',
      appleId: '',
    })
      .then(res => {
        if (res.status == false) {
          Alert.alert('Thông báo', res.message);
        } else {
          Alert.alert('Thông báo', 'Đăng ký thành công', [
            {
              text: 'Chuyển đến màn hình đăng nhập',
              onPress: () => navigation.navigate('Login'),
            },
          ]);
        }
      })
      .catch(err => {
        Alert.alert('Thông báo', err.message);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/* <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate('Home') }}>
                    <Image source={require('../assets/icons/Close.png')} />
                </TouchableOpacity> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>ĐĂNG KÍ</Text>
        </View>
        <View style={styles.textField}>
          <TextField
            label="Số điện thoại (tên đăng nhập)"
            placeholder="Nhập SĐT"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.textField}>
          <TextField
            label="Mật khẩu"
            placeholder="Mật khẩu"
            onChangeText={setPassword}
            isPassword={true}
          />
        </View>
        <View style={styles.textField}>
          <TextField
            label="Nhập lại mật khẩu"
            placeholder="Mật khẩu xác nhận"
            onChangeText={setConfirmPassword}
            isPassword={true}
          />
        </View>
        <View style={styles.textField}>
          <TextField
            label="Họ và tên"
            placeholder="Nhập tên của bạn"
            onChangeText={setFullname}
          />
        </View>
        <View style={styles.loginButton}>
          <ButtonCustom title="Đăng ký" onPress={handleRegister} />
          <Text
            style={styles.noAccount}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Bạn đã có tài khoản?
            <MiniText text=" Đăng nhập ngay" />
          </Text>
        </View>
      </ScrollView>
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
    marginTop: 40,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 29,
    color: theme.colors.green,
  },

  textField: {
    marginTop: 20,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginEnd: 20,
    marginTop: 10,
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
  noAccount: {
    marginTop: 15,
    marginBottom: 20,
    color: theme.colors.darkGrey,
  },
});

export default Register;
