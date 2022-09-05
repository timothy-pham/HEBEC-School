import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {cancelOrder} from '../api/Order';
import Line from '../components/Line';
import theme from '../core/theme';
import {RootStackParamList} from '../navigation/navigation';

const OrderDetail = ({route}: any) => {
  let item: any = route.params.item;

  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  const cancelOrderHandle = () => {
    cancelOrder({orderId: item.id})
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === true) {
            Alert.alert('Thông báo', 'Bạn đã huỷ đơn thành công', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('OrderHistory');
                },
              },
            ]);
          }
        } else {
          Alert.alert('Thông báo', res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  let status;
  let payment;
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

  let paymentMethod = item.paymentType.toLowerCase();

  if (paymentMethod == 'cash') {
    payment = 'Tiền mặt';
  } else if (paymentMethod == 'vnpay') {
    payment = 'Ví VNPay';
  } else if (paymentMethod == 'momo') {
    payment = 'Ví Momo';
  } else if (paymentMethod == 'viettelpay') {
    payment = 'Ví Viettel Pay';
  } else {
    payment = 'Tiền mặt';
  }
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.body}>
        <View style={styles.box}>
          <View style={styles.hStackBetween}>
            <View style={styles.hStack}>
              <Image source={require('../assets/icons/StatusOrder.png')} />
              <Text style={styles.title}>Trạng thái đơn</Text>
            </View>
            <Text style={styles.price}>{status}</Text>
          </View>
        </View>
        <Line />
        <View style={styles.box}>
          <View style={styles.hStack}>
            <Image source={require('../assets/icons/Location.png')} />
            <Text style={styles.title}>Giao đến</Text>
          </View>
          <Text
            style={[
              styles.price,
              {fontWeight: '700', marginTop: 10, fontSize: 16},
            ]}>
            {item.name}
            {' - '}
            {item.phone}
          </Text>
          <Text style={styles.text}>
            {item.address +
              ', ' +
              item.addressWard.name +
              ', ' +
              item.addressDistrict.name +
              ', ' +
              item.addressCity.name}
          </Text>
        </View>
        <Line />
        <View style={styles.box}>
          <View style={styles.hStack}>
            <Image source={require('../assets/icons/StatusOrder.png')} />
            <Text style={styles.title}>Sản phẩm đã chọn</Text>
          </View>
          {item.orderDetails.map((book: any, index: number) => {
            return (
              <View key={index} style={[styles.hStackBetween, {marginTop: 20}]}>
                <View style={{width: '75%'}}>
                  <Text style={styles.text} numberOfLines={2}>
                    {book.book.name}
                  </Text>
                  <Text>
                    {book.finalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                    x {book.quantity}
                  </Text>
                </View>

                <Text style={styles.price}>
                  {(book.finalPrice * book.quantity)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  đ
                </Text>
              </View>
            );
          })}
          <View style={{marginTop: 20}}>
            <Line />
            <View style={styles.hStackBetween}>
              <View>
                <Text style={styles.text}>Tổng tạm tính</Text>
                <Text style={styles.text}>Phí vận chuyển</Text>
              </View>
              <View>
                <Text style={styles.price}>
                  {item.moneyTotal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  đ
                </Text>
                <Text style={styles.price}>
                  {item.moneyDistance
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  đ
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Line />
        <View style={styles.box}>
          <View style={styles.hStackBetween}>
            <View style={styles.hStack}>
              <Image source={require('../assets/icons/Promo.png')} />
              <Text style={styles.title}>Mã khuyến mãi</Text>
            </View>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 16,
                color: theme.colors.darkGrey,
              }}>
              MAKHUYENMAI
            </Text>
          </View>
          <View style={styles.hStackBetween}>
            <Text style={styles.text}>Tiền được khuyến mãi</Text>
            <Text style={styles.price}>
              {item.moneyDiscount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
              đ
            </Text>
          </View>
        </View>
        <Line />
        <View style={styles.box}>
          <View style={styles.hStackBetween}>
            <View style={styles.hStack}>
              <Image source={require('../assets/icons/PaymentMethod.png')} />
              <Text style={styles.title}>Hình thức thanh toán</Text>
            </View>
            <Text
              style={[
                styles.price,
                {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: theme.colors.green,
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                },
              ]}>
              {payment}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.bottomTitle}>
          <Text style={styles.titlePrice}>TỔNG CỘNG</Text>
          <Text style={styles.priceTitle}>
            {item.moneyFinal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
          </Text>
        </View>
        <TouchableOpacity onPress={cancelOrderHandle}>
          <Text style={styles.button}>HUỶ ĐƠN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
  box: {
    padding: 20,
  },
  bottomTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    color: theme.colors.darkGrey,
  },
  title: {
    marginStart: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    color: theme.colors.darkGrey,
  },
  titlePrice: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    color: theme.colors.darkGrey,
  },
  priceTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    color: theme.colors.green,
  },
  price: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    color: theme.colors.green,
  },
  button: {
    marginTop: 20,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Roboto',
    color: theme.colors.white,
    backgroundColor: theme.colors.error,
    borderRadius: 7,
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hStackBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: theme.colors.mediumGrey,
  },
});
export default OrderDetail;
