import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import config from '../config.json';
import theme from '../core/theme';
import moment from 'moment';
import {getNotifications, seenNotification} from '../api/Notification';

const Notifications = ({navigation}: any) => {
  const [notifications, setNotifications] = useState<any>([]);

  const getMoreNotifications = () => {
    getNotifications()
      .then(res => {
        setNotifications(res.data.data.notificationCustomers);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const setSeen = (id: any) => {
    let temp = notifications;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].notificationCustomerId === id) {
        temp[i].isSeen = true;
      }
    }
    setNotifications(temp);
  };

  useEffect(() => {
    getMoreNotifications();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMoreNotifications();
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.container}>
        {notifications.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                seenNotification({notificationCustomerId: item.id})
                  .then(res => {
                    if (res.data.status == true) {
                      setSeen(item.id);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}>
              <View style={styles.item}>
                <Image
                  source={
                    item.isSeen
                      ? require('../assets/icons/SealsDisable.png')
                      : require('../assets/icons/Seals.png')
                  }
                />
                <View style={{flex: 1}}>
                  <Text
                    numberOfLines={1}
                    style={item.isSeen ? styles.titleNot : styles.title}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={item.isSeen ? styles.contentNot : styles.content}>
                    {item.content}
                  </Text>
                  <Text style={item.isSeen ? styles.timeNot : styles.time}>
                    {moment(new Date(item.createdAt * 1000)).format(
                      'hh:MM MM/DD/YYYY ',
                    )}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 20,
  },
  image: {
    height: 100,
    width: 130,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  item: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.darkGrey,
    marginHorizontal: 10,
  },
  titleNot: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.mediumGrey,
    marginHorizontal: 10,
  },
  content: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: theme.colors.darkGrey,
    marginHorizontal: 10,
  },
  contentNot: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: theme.colors.mediumGrey,
    marginHorizontal: 10,
  },
  time: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.grey,
    marginHorizontal: 10,
  },
  timeNot: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.mediumGrey,
    marginHorizontal: 10,
  },
});

export default Notifications;
