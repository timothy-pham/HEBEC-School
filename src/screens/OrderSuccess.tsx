import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../core/theme';
import {RootStackParamList} from '../navigation/navigation';

const OrderSuccess = () => {
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={require('../assets/images/DatSachSuccess.png')} />
        </View>
        <Text style={styles.title}>Đặt đơn thành công</Text>

        <View style={styles.message}>
          <Text style={styles.text}>Hệ thống đã lưu lại đơn của bạn.</Text>
          <Text style={styles.text}>
            Cảm ơn bạn đã sử dụng dịch vụ của HEBEC.
          </Text>
          <Text style={styles.text}>
            Để theo dõi trạng thái đơn, bạn có thể xem tại trang lịch sử mua
            hàng.
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.backButton}>Về trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrderHistory');
            }}>
            <Text style={styles.nextButton}>Xem lịch sử mua hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 100,
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    color: theme.colors.darkGrey,
  },
  message: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.darkGrey,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 90,
  },
  nextButton: {
    marginTop: 20,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Roboto',
    color: theme.colors.white,
    backgroundColor: theme.colors.green,
    borderRadius: 7,
  },
  backButton: {
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Roboto',
    color: theme.colors.green,
    backgroundColor: theme.colors.white,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.green,
  },
});
export default OrderSuccess;
