import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {getBanner} from '../api/Home';
import config from '../config.json';
import theme from '../core/theme';

const CarouselCustom = () => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const width = Dimensions.get('window').width;
  useEffect(() => {
    getBanner()
      .then(res => {
        let data = res.data.data.data;
        let temp: string[] = [];
        for (let i = 0; i < data.length; i++) {
          temp.push(config.BASE_URL + data[i].thumbnail);
        }
        if (images.length != temp.length) {
          setImages(temp);
        }
      })
      .catch(err => {});
  }, [images]);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setActive(index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Image
              key={index}
              source={{uri: images[index]}}
              style={styles.bannerImage}
            />
          </View>
        )}
      />
      <View style={styles.bottom}>
        {images.map((i, k) => {
          return (
            <Text key={i} style={k != active ? styles.dot : styles.dotActive}>
              ⬤
            </Text>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    color: theme.colors.grey,
    margin: 3,
  },
  dotActive: {
    color: theme.colors.green,
    margin: 3,
  },
  bannerImage: {
    borderRadius: 14,
    height: 170,
    marginHorizontal: 10,
    resizeMode: 'cover',
  },
});

export default CarouselCustom;
