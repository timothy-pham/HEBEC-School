import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {ListCategory} from '../models/ListCategory';
import config from '../config.json';
import theme from '../core/theme';
import BookComponent from './BookComponent';
import {getImage} from '../api/Home';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import {Book} from '../models/Book';

interface Props {
  id?: number;
  name?: string;
  thumbnail?: string;
  books?: Book[];
}
const CategoryList: React.FC<Props> = ({id, name, thumbnail, books}) => {
  let url = config.BASE_URL + thumbnail;
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  const checkImage = () => {
    let isValid = false;
    getImage(thumbnail)
      .then(res => {
        if (res.status != 200) {
          isValid = true;
        }
      })
      .catch(err => {
        console.log(err);
      });
    if (isValid) {
      return (
        <Image
          source={require('../assets/images/IconDefault.png')}
          style={styles.image}
        />
      );
    }
    return <Image source={{uri: url}} style={styles.image} />;
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {checkImage()}
          <Text style={styles.title}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchBook', {id: id, name: name});
          }}>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={books}
        renderItem={({item}) => (
          <View style={styles.book}>
            <BookComponent
              name={item.name}
              thumbnail={item.thumbnail}
              originPrice={item.originPrice}
              finalPrice={item.finalPrice}
              isOutOfStock={item.isOutOfStock}
              id={item.id}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    marginStart: 10,
    color: theme.colors.darkGrey,
  },
  image: {
    height: 30,
    width: 30,
  },
  seeMore: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: theme.colors.green,
    paddingEnd: 20,
  },
  book: {
    marginEnd: 20,
    marginTop: 10,
    marginBottom: 40,
  },
});
export default CategoryList;
