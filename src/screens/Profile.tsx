import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';


//components
import { AuthContext } from '../contexts/AuthContext';
import ItemMenu from '../components/ItemMenu';
import { getProfile } from '../api/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../core/theme';
import IUser from '../models/User';

const Profile = () => {
    type profileScreenProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
    const navigation = useNavigation<profileScreenProp>();
    const [user, setUser] = useState<IUser | null>(null);
    const Auth = useContext(AuthContext);
    const isLoggedIn = Auth?.auth.getToken;
    const logoutHandle = () => {
        Alert.alert('Thông báo', "Bạn có muốn đăng xuất không?",
            [
                { text: "Cancel", onPress: () => { } },
                {
                    text: "OK", onPress: async () => {
                        await Auth?.setAuth({
                            token: "",
                            getToken: false
                        });
                        _removeData()
                        navigation.navigate('Login')
                    }
                }
            ]);
    }
    const _removeData = async () => {
        try {
            await AsyncStorage.removeItem(
                'myToken'
            );
        } catch (error) {
            // Error saving data
        }
    };
    const [Information, setInformation] = useState(<View>
        <Text style={styles.title}>TÀI KHOẢN</Text>
        <ItemMenu onPress={() => { navigation.navigate('Login') }} title="Đăng nhập vào HEBEC" icon=<Image source={require('../assets/icons/Login.png')} /> label='' />
    </View>);

    useEffect(() => {
         if (isLoggedIn) {
            getProfile().then(res => {
                let data = res.data.data;
                let name = ''
                let className = ''
                let classCode = ''
                if (data != null) {
                    name = data.name;
                    if (data.classroom != null) {
                        className = data.classroom.name;
                        classCode = data.classroom.code;
                    }
                }

                setInformation(<View>
                    <View style={styles.info}>
                        <Image style={styles.avatar} source={require('../assets/imgs/Avatar.png')} />
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.class}>{className} - MS: {classCode}</Text>
                    </View>

                    <Text style={styles.title}>TÀI KHOẢN</Text>
                    <ItemMenu onPress={() => { }} title="Theo dõi đơn hàng" icon=<Image source={require('../assets/icons/FollowBill.png')} /> label='' />
                    <ItemMenu onPress={() => { navigation.navigate('PersonalInformation') }} title="Thông tin cá nhân" icon=<Image source={require('../assets/icons/UserProfile.png')} /> label='' />
                    <ItemMenu onPress={() => { navigation.navigate('ChangePassword') }} title="Đổi mật khẩu" icon=<Image source={require('../assets/icons/Password.png')} /> label='' />
                    <ItemMenu onPress={() => { }} title="Sổ liên lạc" icon=<Image source={require('../assets/icons/SoLienLac.png')} /> label='' />
                    <ItemMenu onPress={logoutHandle} title="Đăng xuất" icon=<Image source={require('../assets/icons/Logout.png')} /> label='' />
                </View>)
            }).catch(err => {
                console.log(err)
            }
            )
        }

    }, [isLoggedIn]);


    return (
        <SafeAreaView>
            <ScrollView>
                {Information}
                 <Text style={styles.title}>HỖ TRỢ</Text>
                <ItemMenu onPress={() => { }} title="Giới thiệu HEBEC" label='' icon=<Image source={require('../assets/icons/Information.png')} /> />
                <ItemMenu onPress={() => { }} title="Hướng dẫn sử dụng" label='' icon=<Image source={require('../assets/icons/Description.png')} /> />
                <ItemMenu onPress={() => { }} title="Điều khoản sử dụng" label='' icon=<Image source={require('../assets/icons/Policy.png')} /> />
                <ItemMenu onPress={() => { }} title="Các vấn đề thường gặp" label='' icon=<Image source={require('../assets/icons/FAQ.png')} /> />

                <Text style={styles.title}>LIÊN HỆ</Text>
                <ItemMenu onPress={() => { }} title="Chat với admin" label='' isNotification={true} icon=<Image source={require('../assets/icons/Chat.png')} /> />
                <ItemMenu onPress={() => { }} title="Hotline 1800 8080" label='' icon=<Image source={require('../assets/icons/Call.png')} /> />
                <ItemMenu onPress={() => { }} title="Facebook HEBEC" label='' icon=<Image source={require('../assets/icons/Facebook.png')} /> />
                <ItemMenu onPress={() => { }} title="YouTube HEBEC" label='' icon=<Image source={require('../assets/icons/Youtube.png')} /> />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        height: 19,
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'black',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    info: {
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 104,
        height: 104,
        borderRadius: 100,
        borderColor: theme.colors.mediumGrey,
        borderWidth: 2,
    },
    name: {
        fontFamily: 'Roboto',
        marginTop: 10,
        fontSize: 20,
        lineHeight: 23,
        fontWeight: '700',
        color: 'black',
    },
    class: {
        fontFamily: 'Roboto',
        marginTop: 5,
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '400',
        color: 'black',
    }
})


export default Profile