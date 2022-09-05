import {HStack, VStack} from '@react-native-material/core';
import {RadioButton} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {getCity, getDistrict, getWard} from '../api/Address';
import ProgressPayment from '../components/ProgressPayment';
import TextField from '../components/TextField';
import theme from '../core/theme';
import {City} from '../models/City';
import {postOrder} from '../api/Order';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({route}: any) => {
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();

  const [stepScreen, setStepScreen] = useState<any>();
  const [currentStep, setCurrentStep] = useState(1);
  const [headerText, setHeaderText] = useState('');
  const [button, setButton] = useState<any>();
  const [body, setBody] = useState<any>();

  //address
  const [listCity, setListCity] = useState<any>([]);
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [city, setCity] = useState(0);
  const [dropdownCity, setDropdownCity] = useState<any>([]);

  const [listDistrict, setListDistrict] = useState<any>([]);
  const [isOpenDistrict, setIsOpenDistrict] = useState(false);
  const [district, setDistrict] = useState(0);
  const [dropdownDistrict, setDropdownDistrict] = useState<any>([]);

  const [listWard, setListWard] = useState<any>([]);
  const [isOpenWard, setIsOpenWard] = useState(false);
  const [ward, setWard] = useState(0);
  const [dropdownWard, setDropdownWard] = useState<any>([]);

  //order information
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  //delivery information
  const [feeDelivery, setFeeDelivery] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [total, setTotal] = useState(route.params.total);

  //Payment PaymentMethod
  const [payment, setPayment] = useState('cash');
  const listBook = route.params.listBook;

  const getCityForm = () => {
    getCity()
      .then(res => {
        let data = res.data.data.data;
        let temp: City[] = [];
        let temp_dropdown: any = [];
        for (let i = 0; i < data.length; i++) {
          temp.push({
            id: data[i].id,
            name: data[i].name,
            code: data[i].code,
            feeDelivery: data[i].feeDelivery,
            isBlock: data[i].isBlock,
            type: data[i].type,
            priority: data[i].priority,
            slug: data[i].slug,
            nameWithType: data[i].nameWithType,
          });
          temp_dropdown.push({
            label: data[i].name,
            value: data[i].id,
          });
        }

        setListCity(temp);
        setDropdownCity(temp_dropdown);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDistrictForm = () => {
    let cityCode;
    for (let i = 0; i < listCity.length; i++) {
      if (listCity[i].id == city) {
        cityCode = listCity[i].code;
      }
    }
    getDistrict({parentCode: cityCode})
      .then(res => {
        let data = res.data.data.data;
        let temp: any = [];
        let temp_dropdown: any = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
            temp_dropdown.push({
              label: data[i].name,
              value: data[i].id,
            });
          }
          setListDistrict(temp);
          setDropdownDistrict(temp_dropdown);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getWardForm = () => {
    let districtCode;
    for (let i = 0; i < listDistrict.length; i++) {
      if (listDistrict[i].id == district) {
        districtCode = listDistrict[i].code;
      }
    }
    getWard({parentCode: districtCode})
      .then(res => {
        let data = res.data.data.data;
        let temp: any = [];
        let temp_dropdown: any = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
            temp_dropdown.push({
              label: data[i].name,
              value: data[i].id,
            });
          }
          setListWard(temp);
          setDropdownWard(temp_dropdown);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCityForm();
  }, []);

  useEffect(() => {
    for (let i = 0; i < listCity.length; i++) {
      if (listCity[i].id == city) {
        setFeeDelivery(listCity[i].feeDelivery);
      }
    }
    setDropdownDistrict([]);
    setDropdownWard([]);
    getDistrictForm();
  }, [city]);

  useEffect(() => {
    setDropdownWard([]);
    getWardForm();
  }, [district]);

  const getBody = () => {
    if (currentStep === 1) {
      return (
        <View style={styles.all}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Địa chỉ giao hàng</Text>
            <ProgressPayment currentStep={currentStep} />
          </View>
          <View style={styles.body}>
            <View>
              <View style={styles.input}>
                <TextField
                  value={name}
                  label="Họ tên người nhận"
                  placeholder="Nhập họ và tên người nhận hàng"
                  onChangeText={setName}
                />
              </View>
              <View style={styles.input}>
                <TextField
                  value={phone}
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại người nhận hàng"
                  onChangeText={setPhone}
                />
              </View>
              <View style={styles.dropDownPicker}>
                <Text style={styles.label}>
                  Tỉnh/ Thành phố
                  <Text style={{color: theme.colors.error}}> *</Text>
                </Text>
                <DropDownPicker
                  open={isOpenCity}
                  setOpen={setIsOpenCity}
                  value={city}
                  setValue={setCity}
                  items={dropdownCity}
                  setItems={setDropdownCity}
                  placeholder="Chọn tỉnh / thành phố"
                  placeholderStyle={styles.placeholder}
                  zIndex={100}
                />
              </View>
              <View style={styles.dropDownPicker}>
                <Text style={styles.label}>
                  Quận / Huyện
                  <Text style={{color: theme.colors.error}}> *</Text>
                </Text>
                <DropDownPicker
                  open={isOpenDistrict}
                  setOpen={setIsOpenDistrict}
                  value={district}
                  setValue={setDistrict}
                  items={dropdownDistrict}
                  setItems={setDropdownDistrict}
                  placeholder="Chọn quận / huyện"
                  placeholderStyle={styles.placeholder}
                  zIndex={99}
                />
              </View>
              <View style={styles.dropDownPicker}>
                <Text style={styles.label}>
                  Phường / Xã
                  <Text style={{color: theme.colors.error}}> *</Text>
                </Text>
                <DropDownPicker
                  open={isOpenWard}
                  setOpen={setIsOpenWard}
                  value={ward}
                  setValue={setWard}
                  items={dropdownWard}
                  setItems={setDropdownWard}
                  placeholder="Chọn phường / xã"
                  placeholderStyle={styles.placeholder}
                  zIndex={98}
                />
              </View>
              <View style={styles.input}>
                <TextField
                  value={address}
                  label="Địa chỉ"
                  placeholder="VD: 1 Đường Bạch Đằng"
                  onChangeText={setAddress}
                />
              </View>
            </View>
          </View>
          <View style={styles.button1}>
            {MyButton(true, () => {
              if (
                name != '' &&
                address != '' &&
                phone != '' &&
                city != 0 &&
                district != 0 &&
                ward != 0
              ) {
                setCurrentStep(currentStep + 1);
              } else {
                Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
              }
            })}
          </View>
        </View>
      );
    } else if (currentStep === 2) {
      return (
        <View style={styles.all}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Vận chuyển</Text>
            <ProgressPayment currentStep={currentStep} />
          </View>
          <View style={styles.body}>
            <View style={styles.box}>
              <View style={styles.hStackBetween}>
                <HStack>
                  <Image source={require('../assets/icons/Delivery.png')} />
                  <Text style={styles.text}>Phí vận chuyển</Text>
                </HStack>
                <Text style={styles.price}>
                  {feeDelivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  đ
                </Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.hStackBetween}>
                <HStack>
                  <Image source={require('../assets/icons/Promo.png')} />
                  <Text style={styles.text}>Mã khuyến mãi</Text>
                </HStack>
                <TextInput style={styles.promoInput} />
              </View>
              <View style={[styles.hStackBetween, {marginTop: 10}]}>
                <Text style={styles.simpleText}>Tiền được khuyến mãi</Text>
                <Text style={styles.price}>
                  {promotion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.hStackBetween,
                {marginTop: 20, marginHorizontal: 20},
              ]}>
              <HStack>
                <Image source={require('../assets/icons/TotalCost.png')} />
                <Text style={styles.text}>Tổng cộng</Text>
              </HStack>
              <Text style={styles.priceTotal}>
                {(total + feeDelivery)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                đ
              </Text>
            </View>
          </View>
          <View style={styles.button}>
            {MyButton(false, () => {
              setCurrentStep(currentStep - 1);
            })}
            {MyButton(true, () => {
              setCurrentStep(currentStep + 1);
            })}
          </View>
        </View>
      );
    } else if (currentStep === 3) {
      return (
        <View style={styles.all}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Phương thức thanh toán</Text>
            <ProgressPayment currentStep={currentStep} />
          </View>
          <View style={styles.body}>
            <View style={styles.header}>
              <HStack>
                <Image source={require('../assets/icons/PaymentMethod.png')} />
                <Text style={styles.text}>Hình thức thanh toán</Text>
              </HStack>

              <View style={styles.hStack}>
                <RadioButton
                  color={theme.colors.green}
                  value="cash"
                  status={payment === 'cash' ? 'checked' : 'unchecked'}
                  onPress={() => setPayment('cash')}
                />
                <Text style={styles.simpleText}>Tiền mặt</Text>
              </View>
              <View style={styles.hStack}>
                <RadioButton
                  color={theme.colors.green}
                  value="viettelPay"
                  status={payment === 'viettelPay' ? 'checked' : 'unchecked'}
                  onPress={() => setPayment('viettelPay')}
                />
                <Text style={styles.simpleText}>Ví Viettel Pay</Text>
              </View>
              <View style={styles.hStack}>
                <RadioButton
                  color={theme.colors.green}
                  value="momo"
                  status={payment === 'momo' ? 'checked' : 'unchecked'}
                  onPress={() => setPayment('momo')}
                />
                <Text style={styles.simpleText}>Momo</Text>
              </View>
            </View>
          </View>
          <View style={styles.button}>
            {MyButton(false, () => {
              setCurrentStep(currentStep - 1);
            })}
            {MyButton(true, () => {
              let temp: any = [];
              for (let i = 0; i < listBook.length; i++) {
                temp.push({
                  id: listBook[i].id,
                  quantity: listBook[i].quantity,
                  attributeId1: 0,
                  attributeId2: 0,
                });
              }

              postOrder({
                order: {
                  note: '',
                  paymentType: payment,
                  code: '',
                  address: address,
                  phone: phone,
                  name: name,
                  moneyDistance: feeDelivery,
                  moneyTotal: total,
                  moneyDiscount: 0,
                  moneyFinal: total + feeDelivery,
                  expoToken: 'string',
                  kvCode: 'string',
                  kvId: 'string',
                },
                expoToken: 'string',
                details: temp,
                addressCityId: city,
                addressDistrictId: district,
                addressWardId: ward,
              })
                .then(res => {
                  if (res.status === false) {
                    Alert.alert('Thông báo', res.message);
                  } else {
                    AsyncStorage.removeItem('Cart');
                    navigation.navigate('OrderSuccess');
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Done</Text>
        </View>
      );
    }
  };

  const MyButton = (isNext: boolean, onPress: any) => {
    if (isNext) {
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.nextButton}>Tiếp theo</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.backButton}>Quay lại</Text>
        </TouchableOpacity>
      );
    }
  };

  return <SafeAreaView style={styles.container}>{getBody()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  all: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  body: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hStackBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  simpleText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    color: theme.colors.darkGrey,
  },
  text: {
    marginStart: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    color: theme.colors.darkGrey,
    marginBottom: 5,
  },
  input: {
    marginBottom: 20,
  },
  price: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    color: theme.colors.green,
  },
  priceTotal: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    color: theme.colors.green,
  },
  promoInput: {
    height: 35,
    width: 100,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: theme.colors.darkGrey,
  },
  dropDownPicker: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: theme.colors.darkGrey,
    marginBottom: 5,
  },
  placeholder: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    color: theme.colors.grey,
  },

  headerText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.darkGrey,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },

  nextButton: {
    height: 50,
    width: 170,
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
    width: 170,
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

export default Payment;
