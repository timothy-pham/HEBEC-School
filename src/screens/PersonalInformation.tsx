import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getProfile} from '../api/Profile';

//components

import theme from '../core/theme';
import IUser from '../models/User';

const PersonalInformation = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  getProfile()
    .then(res => {
      let data = res.data.data;
      if (data != null) {
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setGender(data.gender);
        if (data.classroom != null) {
          setClassName(data.classroom.name);
          setClassCode(data.classroom.code);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.top}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/Avatar.png')}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.container}>
            <Text style={styles.title}>THÔNG TIN CHUNG</Text>
            <View style={styles.box}>
              <Text style={styles.name}>Họ & tên</Text>
              <Text style={styles.content}>{name}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.name}>Giới tính</Text>
              <Text style={styles.content}>{gender}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.name}>Ngày sinh</Text>
              <Text style={styles.content}>1/5/2010</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.name}>Lớp</Text>
              <Text style={styles.content}>{className}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.name}>Mã số</Text>
              <Text style={styles.content}>{classCode}</Text>
            </View>
          </View>
          <Text style={styles.title}>THÔNG TIN KHÁC</Text>
          <View style={styles.box}>
            <Text style={styles.name}>Địa chỉ</Text>
            <Text style={styles.content}>{address}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.name}>Số điện thoại</Text>
            <Text style={styles.content}>{phone}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    zIndex: 1,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '#EEEEEE',
  },
  bottom: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    position: 'relative',
    bottom: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 100,
    borderColor: theme.colors.mediumGrey,
    borderWidth: 2,
  },
  container: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mediumGrey,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '700',
    color: theme.colors.green,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  name: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    color: theme.colors.darkGrey,
  },
  content: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '500',
    color: theme.colors.darkGrey,
    alignContent: 'flex-start',
    width: '65%',
  },
});

export default PersonalInformation;
