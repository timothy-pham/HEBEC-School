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
import CarouselCustom from '../components/CarouselCustom';
import Categories from '../components/Categories';

const News = () => {
  type newsScreenProp = NativeStackNavigationProp<RootStackParamList, 'News'>;
  const navigation = useNavigation<newsScreenProp>();
  return <Text>Tin tuc</Text>;
};

const styles = StyleSheet.create({});

export default News;
