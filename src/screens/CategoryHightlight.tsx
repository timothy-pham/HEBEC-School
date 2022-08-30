import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getCategoryHighlight} from '../api/Category';
import CategoryList from '../components/CategoryList';
import {ListCategory} from '../models/ListCategory';

const CategoryHighlight = () => {
  const [listCategory, setListCategory] = useState<ListCategory[]>([]);
  useEffect(() => {
    getCategoryHighlight()
      .then(res => {
        let data = res.data.data;
        let temp: ListCategory[] = [];
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
          }
          if (listCategory.length != temp.length) {
            setListCategory(temp);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [listCategory]);

  return (
    <View style={styles.container}>
      {listCategory.map((category, index) => {
        return (
          <CategoryList
            key={index}
            id={category.id}
            name={category.name}
            thumbnail={category.thumbnail}
            books={category.books}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
    marginStart: 20,
  },
});

export default CategoryHighlight;
