import React, {useState, memo} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Book} from '../models/Book';
import config from '../config.json';
import theme from '../core/theme';
import {getImage} from '../api/Home';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import {useNavigation} from '@react-navigation/native';

const BookComponent = ({
  id,
  name,
  thumbnail,
  originPrice,
  finalPrice,
  isOutOfStock,
}: Book) => {
  let url = config.BASE_URL + thumbnail;
  let [isValid, setIsValid] = useState(true);

  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  let price, priceBefore;
  if (finalPrice != undefined && originPrice != undefined) {
    price = finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    priceBefore = originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const checkImage = () => {
    getImage(url)
      .then(res => {
        if (res.status != 200) {
          setIsValid(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
    if (!isValid) {
      return (
        <Image
          source={require('../assets/images/BookDefault.png')}
          style={styles.image}
        />
      );
    }
    return <Image source={{uri: url}} style={styles.image} />;
  };

  const seeDetail = () => {
    let bookId: any = id;
    navigation.navigate('DetailBook', {id: bookId});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={seeDetail}>
      {checkImage()}
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.finalPrice}>{price}đ</Text>
      <Text style={styles.originPrice}>{priceBefore} đ</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 177,
    height: 270,
    borderRadius: 7,
    shadowOffset: {width: 20, height: 20},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: 'white',
  },
  image: {
    height: 177,
    width: 177,
    resizeMode: 'contain',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16.41,
    color: theme.colors.darkGrey,
    marginTop: 10,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  finalPrice: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  originPrice: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: theme.colors.mediumGrey,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    textDecorationLine: 'line-through',
  },
});

export default memo(BookComponent);
