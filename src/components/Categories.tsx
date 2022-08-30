import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getCategory} from '../api/Category';
import theme from '../core/theme';
import config from '../config.json';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
type Category = {
  id: number;
  name: string;
  thumbnail: string;
};

const Categories = () => {
  const [listCategory1, setListCategory1] = useState<Category[]>([]);
  const [listCategory2, setListCategory2] = useState<Category[]>([]);
  const [length, setLength] = useState(0);
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();
  getCategory()
    .then(res => {
      let data = res.data.data.categories;
      let temp: Category[] = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].isHighlight == true) {
          temp.push({
            id: data[i].id,
            name: data[i].name,
            thumbnail: config.BASE_URL + data[i].thumbnail,
          });
        }
      }
      if (length == 0) {
        let index = temp.length / 2;
        setLength(temp.length);
        setListCategory1(temp.splice(0, index));
        index = temp.length;
        setListCategory2(temp.splice(0, index));
      }
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <View style={styles.row}>
          {listCategory1.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.box}
                onPress={() => {
                  navigation.navigate('SearchBook', {
                    id: item.id,
                    name: item.name,
                  });
                }}>
                <Image style={styles.image} source={{uri: item.thumbnail}} />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.row}>
          {listCategory2.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.box}
                onPress={() => {
                  navigation.navigate('SearchBook', {
                    id: item.id,
                    name: item.name,
                  });
                }}>
                <Image style={styles.image} source={{uri: item.thumbnail}} />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  box: {
    marginEnd: 10,
    width: 86,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    //paddingHorizontal: 20,
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.41,
    color: theme.colors.darkGrey,
    textAlign: 'center',
  },
});

export default Categories;
