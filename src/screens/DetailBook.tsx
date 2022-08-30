import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getBookById} from '../api/Book';
import {Button} from '@react-native-material/core';
import config from '../config.json';
import theme from '../core/theme';
import {getImage} from '../api/Home';

type Information = {
  date: string;
  size: string;
  cover: string;
  page: number;
  authorName: string;
};

type Title = {
  image: string;
  name: string;
  finalPrice: number;
  originalPrice: number;
  bookGalleries: Array<string>;
  description: string;
};
const DetailBook = ({route}: any) => {
  const id: number = route.params.id;
  const [book, setBook] = useState<Title>({
    image: config.BASE_URL + '/media/image_product.png',
    name: '',
    finalPrice: 0,
    originalPrice: 0,
    bookGalleries: [],
    description: '',
  });
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(
    config.BASE_URL + '/media/image_product.png',
  );
  const [information, setInformation] = useState<Information>({
    date: '5-2019',
    size: '14.5 x 20.5 cm',
    cover: 'Bìa mềm',
    page: 100,
    authorName: 'Nhà xuất bản giáo dục Việt Nam',
  });

  useEffect(() => {
    getBookById({id: id})
      .then(res => {
        if (res.data.status === true) {
          let data = res.data.data;
          let temp = [];
          for (let i = 0; i < data.bookGalleries.length; i++) {
            temp.push(config.BASE_URL + data.bookGalleries[i].thumbnail);
          }
          setBook({
            image: config.BASE_URL + data.thumbnail,
            name: data.name,
            finalPrice: data.finalPrice,
            originalPrice: data.originalPrice,
            bookGalleries: temp,
            description: data.description,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getImage(book.image)
      .then(res => {
        if (res.status != 200) {
          setImage(config.BASE_URL + '/media/image_product.png');
        }
      })
      .catch(err => {
        console.log(err);
      });
    setImage(book.image);
  }, [book]);

  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        source={{uri: image}}
        style={styles.image}
        defaultSource={require('../assets/imgs/BookDefault.png')}
      />

      <View style={styles.listImage}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator
          data={book?.bookGalleries}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setBook({
                  ...book,
                  image: item,
                });
              }}
              style={styles.imageSubContainer}>
              <Image
                style={styles.imageSub}
                source={{uri: item}}
                defaultSource={require('../assets/imgs/BookDefault.png')}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={styles.name}>{book.name}</Text>
      <Text style={styles.finalPrice}>
        {book.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
      </Text>
      <View style={styles.orderQuantity}>
        <Text style={styles.soLuongDat}>Số lượng đặt</Text>
        <View style={styles.upDownNumber}>
          <TouchableOpacity onPress={minusQuantity}>
            <Image source={require('../assets/icons/MinusCircle.png')} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={plusQuantity}>
            <Image source={require('../assets/icons/PlusCircle.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        title="Thêm vào giỏ hàng"
        onPress={addToCart}
        style={styles.button}
      />
      <View style={styles.information}>
        <View style={styles.titleInformation}>
          <Image
            source={require('../assets/icons/Information.png')}
            style={styles.titleInformationImage}
          />
          <Text style={styles.titleInformationText}>Thông tin chi tiết</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.nameInformation}>Ngày xuất bản</Text>
          <Text style={styles.contentInformation}>{information.date}</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.nameInformation}>Kích thước</Text>
          <Text style={styles.contentInformation}>{information.size}</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.nameInformation}>Loại bìa</Text>
          <Text style={styles.contentInformation}>{information.cover}</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.nameInformation}>Số trang</Text>
          <Text style={styles.contentInformation}>{information.page}</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.nameInformation}>Nhà xuất bản</Text>
          <Text style={styles.contentInformation}>
            {information.authorName}
          </Text>
        </View>
      </View>
      <View style={styles.information}>
        <View style={styles.titleInformation}>
          <Image
            source={require('../assets/icons/Description.png')}
            style={styles.titleInformationImage}
          />
          <Text style={styles.titleInformationText}>Mô tả sản phẩm</Text>
        </View>
        <Text style={styles.description}>{book.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: theme.colors.darkGrey,
    marginBottom: 40,
  },
  information: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  titleInformation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleInformationImage: {
    width: 20,
    height: 20,
  },
  titleInformationText: {
    marginStart: 10,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: theme.colors.green,
  },
  boxInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  nameInformation: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    color: theme.colors.darkGrey,
  },
  contentInformation: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '500',
    color: theme.colors.darkGrey,
    alignContent: 'flex-start',
    width: '65%',
  },
  orderQuantity: {
    marginTop: 28,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  soLuongDat: {
    color: theme.colors.darkGrey,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  upDownNumber: {
    flexDirection: 'row',
  },
  quantity: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    color: theme.colors.darkGrey,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  button: {
    width: '90%',
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    backgroundColor: theme.colors.green,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: 'white',
  },
  image: {
    height: 350,
    width: '100%',
    resizeMode: 'contain',
  },
  listImage: {
    marginTop: 20,
    marginStart: 10,
  },
  imageSubContainer: {
    marginEnd: 10,
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.grey,
  },
  imageSub: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    color: theme.colors.darkGrey,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  finalPrice: {
    color: theme.colors.error,
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 35,
    marginTop: 5,
    paddingHorizontal: 20,
  },
});

export default DetailBook;
