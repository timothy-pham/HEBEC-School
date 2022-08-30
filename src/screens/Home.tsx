import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import theme from '../core/theme';
import {TextInput} from 'react-native-paper';
import CarouselCustom from '../components/CarouselCustom';
import Categories from '../components/Categories';
import BookList from '../components/CategoryList';
import CategoryHighlight from './CategoryHightlight';

//components

const Home = () => {
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  const [text, setText] = useState('');

  const searchBook = () => {
    if (text != '') {
      navigation.navigate('SearchBook', {name: text});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder="Bạn cần tìm kiếm sản phẩm gì?"
            underlineColor="transparent"
            activeUnderlineColor={theme.colors.green}
            onChangeText={setText}
            onEndEditing={searchBook}
            right={
              <TextInput.Icon
                name="magnify"
                color="#000"
                onPress={searchBook}
              />
            }
          />
        </View>
        <View style={styles.cart}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <Image source={require('../assets/icons/Cart.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.homeScreen}>
        <View style={styles.greenBackground}></View>
        <View style={styles.banner}>
          <CarouselCustom />
          <View style={styles.categories}>
            <Categories />
          </View>
        </View>
        <View style={styles.bookList}>
          <CategoryHighlight />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  homeScreen: {
    width: '100%',
  },
  header: {
    height: 70,
    backgroundColor: theme.colors.green,
    flexDirection: 'row',
  },
  search: {
    marginVertical: 10,
    marginStart: 20,
    width: '80%',
  },
  searchInput: {
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderRadius: 7,
    fontSize: 16,
    fontWeight: '400',
  },
  cart: {
    marginVertical: 10,
    marginStart: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  greenBackground: {
    height: 70,
    backgroundColor: theme.colors.green,
  },
  banner: {
    bottom: 60,
    position: 'relative',
  },
  categories: {
    marginStart: 20,
  },
  bookList: {},
});

export default Home;
