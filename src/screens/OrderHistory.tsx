import {HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getOrder} from '../api/Order';
import theme from '../core/theme';
import {RootStackParamList} from '../navigation/navigation';

const OrderHistory = () => {
  const [listOrder, setListOrder] = useState<any>([]);

  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();

  const getListOrder = () => {
    getOrder()
      .then(res => {
        let data = res.data.data.data;
        let temp: any = [];
        data.map((item: any) => {
          temp.push(item);
        });
        setListOrder(temp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListOrder();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={listOrder}
        renderItem={({item}) => {
          let status = '';
          if (item.status == 'PENDING') {
            status = 'Đang chờ xử lý';
          } else if (item.status == 'PACKAGE') {
            status = 'Đang đóng gói';
          } else if (item.status == 'DELIVERING') {
            status = 'Đang vận chuyển';
          } else if (item.status == 'COMPLETE') {
            status = 'Đã giao';
          } else if (item.status == 'CANCEL') {
            status = 'Đã huỷ';
          }
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OrderDetail', {item: item});
              }}>
              <View style={styles.item}>
                <Image source={require('../assets/icons/BoxShipping.png')} />
                <View style={styles.content}>
                  <View style={styles.header}>
                    <Text style={styles.code}>{item.code}</Text>

                    <Text style={styles.price}>
                      {item.moneyFinal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                      đ
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.text}>
                      {moment(new Date(item.createdAt * 1000)).format(
                        'hh:MM MM/DD/YYYY ',
                      )}
                    </Text>
                    <Text numberOfLines={1} style={styles.text}>
                      Giao đến:{' '}
                      <Text style={styles.textBold}>
                        {item.address +
                          ', ' +
                          item.addressWard.name +
                          ', ' +
                          item.addressDistrict.name +
                          ', ' +
                          item.addressCity.name}
                      </Text>
                    </Text>
                    <Text style={styles.text}>
                      Số lượng:{' '}
                      <Text style={styles.textBold}>
                        {item.orderDetails.length} sản phẩm •{' '}
                      </Text>
                      <Text style={styles.status}>{status}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  item: {
    paddingVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  content: {
    marginStart: 10,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  code: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  price: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: theme.colors.error,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: theme.colors.mediumGrey,
  },
  textBold: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: theme.colors.mediumGrey,
  },
  status: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: theme.colors.green,
  },
});

export default OrderHistory;
