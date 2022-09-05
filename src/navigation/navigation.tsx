import React, {useContext} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {AuthContext} from '../contexts/AuthContext';
import theme from '../core/theme';
import {Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screen
import Home from '../screens/Home';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import News from '../screens/News';
import Notifications from '../screens/Notifications';
import ChangePassword from '../screens/ChangePassword';
import PersonalInformation from '../screens/PersonalInformation';
import DetailBook from '../screens/DetailBook';
import SearchBook from '../screens/SearchBook';
import Cart from '../screens/Cart';
import {useNavigation} from '@react-navigation/native';
import Payment from '../screens/Payment';
import OrderSuccess from '../screens/OrderSuccess';
import OrderHistory from '../screens/OrderHistory';
import OrderDetail from '../screens/OrderDetail';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Home: any;
  Login: any;
  ForgotPassword: any;
  Register: any;
  Profile: any;
  News: any;
  Notifications: any;
  ChangePassword: any;
  PersonalInformation: any;
  DetailBook: {id: number};
  SearchBook: {id?: number; name?: string};
  Cart: any;
  Payment: any;
  OrderSuccess: any;
  OrderHistory: any;
  OrderDetail: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  const Auth = useContext(AuthContext);
  const isLoggedIn = Auth?.auth.getToken;
  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.green,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.green,
          },
          tabBarHideOnKeyboard: true,
          headerTitleStyle: {
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: '700',
            lineHeight: 16,
          },
          tabBarLabelStyle: {
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 16,
          },
          tabBarIconStyle: {
            width: 23,
            height: 23,
          },
        }}>
        <Tab.Screen
          name="HomePage"
          component={Home}
          options={{
            headerShown: false,
            title: 'Trang Chủ',

            tabBarIcon: ({size, focused, color}) => {
              if (focused) {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/DashboardActive.png')}
                  />
                );
              } else {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/Dashboard.png')}
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="News"
          component={News}
          options={{
            title: 'Tin tức',
            tabBarIcon: ({size, focused, color}) => {
              if (focused) {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/NewsActive.png')}
                  />
                );
              } else {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/News.png')}
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Thông báo',
            tabBarIcon: ({size, focused, color}) => {
              if (focused) {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/NotificationActive.png')}
                  />
                );
              } else {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/Notification.png')}
                  />
                );
              }
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Tài khoản',
            tabBarIcon: ({size, focused, color}) => {
              if (focused) {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/AccountActive.png')}
                  />
                );
              } else {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('../assets/icons/Account.png')}
                  />
                );
              }
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  if (!isLoggedIn) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.green,
          },
          headerTitleStyle: {
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: '700',
          },
        }}>
        <Stack.Screen name="Home" component={HomeTab} />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{title: 'Đổi mật khẩu', headerShown: true}}
        />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
          options={{title: 'Thông tin tài khoản', headerShown: true}}
        />
        <Stack.Screen
          name="DetailBook"
          component={DetailBook}
          options={{
            title: 'Thông tin sách',
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Cart');
                }}>
                <Image source={require('../assets/icons/Cart.png')} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="SearchBook" component={SearchBook} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            title: 'Giỏ hàng',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: true,
            title: 'Thanh toán',
          }}
        />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{
            headerShown: true,
            title: 'Lịch sử mua hàng',
          }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            headerShown: true,
            title: 'Chi tiết đơn hàng',
          }}
        />
      </Stack.Navigator>
    );
  }
};

export default Navigator;
