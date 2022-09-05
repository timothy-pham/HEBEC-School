import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import theme from '../core/theme';
import {RootStackParamList} from '../navigation/navigation';

const Cart = () => {
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
  const navigation = useNavigation<homeScreenProp>();
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(0);

  const getData = async () => {
    const value = await _retrieveData();
    if (value !== null) {
      let temp = JSON.parse(value);
      let total = 0;
      for (let i = 0; i < temp.length; i++) {
        total += temp[i].price * temp[i].quantity;
      }
      setData(temp);
      setTotal(total);
    }
  };

  const storeNewData = async () => {
    _storeData(data);
  };
  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
    storeNewData();
  }, [total]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icons/Books.png')} />
        <Text style={styles.headerText}>Sản phẩm đã chọn</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <View style={styles.leftItem}>
                <Text style={styles.leftText} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.itemPrice}>
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  đ
                </Text>
              </View>
              <View style={styles.rightItem}>
                <View style={styles.upDownNumber}>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.quantity > 1) {
                        let temp = data;
                        temp[index].quantity--;
                        setData(temp);
                        let total = 0;
                        for (let i = 0; i < data.length; i++) {
                          total += data[i].price * data[i].quantity;
                        }
                        setTotal(total);
                      }
                    }}>
                    <Image
                      source={require('../assets/icons/MinusCircle.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      let temp = data;
                      temp[index].quantity++;
                      setData(temp);
                      let total = 0;
                      for (let i = 0; i < data.length; i++) {
                        total += data[i].price * data[i].quantity;
                      }
                      setTotal(total);
                    }}>
                    <Image source={require('../assets/icons/PlusCircle.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.bottomText}>
          <Text style={styles.title}>Tổng tạm tính</Text>
          <Text style={styles.totalPrice}>
            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Payment', {total: total, listBook: data});
          }}>
          <Text style={styles.button}>Đặt sách</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    marginStart: 10,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.darkGrey,
    lineHeight: 24,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  itemPrice: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.green,
    lineHeight: 17,
  },
  leftItem: {
    width: '80%',
  },
  leftText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18.75,
    color: theme.colors.darkGrey,
    flexWrap: 'wrap',
    paddingEnd: 10,
  },
  rightItem: {
    width: '20%',
  },
  bottom: {
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 5,
    width: '100%',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.darkGrey,
    lineHeight: 23,
  },
  totalPrice: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.green,
    lineHeight: 23,
  },
  button: {
    height: 50,
    backgroundColor: theme.colors.green,
    borderRadius: 7,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.white,
    marginTop: 18,
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
});
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('Cart');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
const _storeData = async (data: any) => {
  try {
    await AsyncStorage.setItem('Cart', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
export default Cart;
