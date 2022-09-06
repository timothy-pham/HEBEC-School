import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getNews} from '../api/News';
import config from '../config.json';
import theme from '../core/theme';
import moment from 'moment';

const isCloseToBottom = (nativeEvent: any) => {
  const paddingToBottom = 20;
  return (
    nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
    nativeEvent.contentSize.height - paddingToBottom
  );
};

const News = ({navigation}: any) => {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<any>([]);

  const getMoreNews = () => {
    getNews({page: page, limit: 100})
      .then(res => {
        setNews(res.data.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPage(1);
      getMoreNews();
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <FlatList
          data={news}
          renderItem={({item}) => {
            return (
              <View style={styles.item}>
                <Image
                  source={{uri: config.BASE_URL + item.thumbnail}}
                  style={styles.image}
                />
                <View style={{flex: 1}}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                  </Text>
                  <Text style={styles.time}>
                    {moment(new Date(item.createdAt * 1000)).format(
                      'hh:MM MM/DD/YYYY ',
                    )}
                  </Text>
                </View>
              </View>
            );
          }}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              setPage(page + 1);
            }
          }}
          scrollEventThrottle={400}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.darkGrey,

    marginTop: 10,
    marginHorizontal: 10,
  },
  time: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.mediumGrey,
    marginHorizontal: 10,
  },
});

export default News;
