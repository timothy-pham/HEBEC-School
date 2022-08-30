import React, {useContext, useState} from 'react';
import {
  Alert,
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
import {login} from '../api/Auth';

//components
import Logo from '../components/Logo';
import TextField from '../components/TextField';
import MiniText from '../components/MiniText';
import ButtonCustom from '../components/ButtonCustom';

const Notifications = () => {
  type notificationsScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'Notifications'
  >;
  const navigation = useNavigation<notificationsScreenProp>();
  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        Notification
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Notifications;
