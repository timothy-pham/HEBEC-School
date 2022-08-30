import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import {login} from '../api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import Logo from '../components/Logo';
import TextField from '../components/TextField';
import MiniText from '../components/MiniText';
import ButtonCustom from '../components/ButtonCustom';
import {AuthContext} from '../contexts/AuthContext';
import theme from '../core/theme';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  type loginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
  const navigation = useNavigation<loginScreenProp>();

  const value = useContext(AuthContext);
  const _storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem('myToken', token);
    } catch (error) {
      console.log(error);
    }
  };
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('myToken');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  const handleLogin = async () => {
    login({
      username: username,
      password: password,
      expoToken: 'string',
    })
      .then(async res => {
        if (res.status == false) {
          Alert.alert('Thông báo', res.message);
        } else {
          await _storeData(res.data.data.token);
          const token = await _retrieveData();
          if (token !== null) {
            value?.setAuth({
              token: res.data.data.token,
              getToken: true,
            });
            navigation.navigate('Home');
          }
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
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.textField}>
          <TextField
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.textField}>
          <TextField
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            onChangeText={setPassword}
            isPassword={true}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <MiniText text="Quên mật khẩu?" />
        </TouchableOpacity>
        <View style={styles.loginButton}>
          <ButtonCustom title="Đăng nhập" onPress={handleLogin} />
          <Text
            style={styles.noAccount}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Bạn chưa có tài khoản?
            <MiniText text=" Đăng kí ngay" />
          </Text>
          <Text style={styles.noAccount}>- Hoặc tiếp tục với -</Text>
          <View>{/* Đăng nhập bằng Zalo và Facebook */}</View>
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
  logo: {
    marginBottom: 45,
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

export default Login;
