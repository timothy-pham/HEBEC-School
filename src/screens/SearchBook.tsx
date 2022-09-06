import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  RefreshControl,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import theme from '../core/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import {getBook} from '../api/Book';
import BookComponent from '../components/BookComponent';
import ModalFilter from '../components/ModalFilter';

type BookInfo = {
  id: number;
  name: string;
  thumbnail: string;
  originPrice: number;
  finalPrice: number;
  isOutOfStock?: boolean;
};

type searchFilter = {
  category: number;
  sortPrice: string;
};

const isCloseToBottom = (nativeEvent: any) => {
  const paddingToBottom = 20;
  return (
    nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
    nativeEvent.contentSize.height - paddingToBottom
  );
};

const SearchBook = ({route}: any) => {
  type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<homeScreenProp>();

  const text: string = route.params.name;
  const id: number = route.params.id;

  const [newText, setNewText] = useState(text);
  const [searchText, setSearchText] = useState(newText);
  const [length, setLength] = useState(0);

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<searchFilter>();
  const [listBook, setListBook] = useState<BookInfo[]>([]);
  const [page, setPage] = useState(1);

  const [categoryId, setCategoryId] = useState(id | 0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setListBook([]);
    setPage(1);
    getResult();
    setRefreshing(false);
  }, []);

  //filter
  const searchBook = () => {
    setFilter(undefined);
    setPage(1);
    setListBook([]);
    setCategoryId(0);
    setSearchText(newText);
  };

  const getResult = () => {
    if (page == 1) {
      setIsLoading(true);
    }
    let data: any = {};
    data.page = page;
    if (categoryId != 0) {
      data.categoryId = id;
      setSearchText('');
    } else if (searchText != '') {
      data.search = searchText;
    }
    if (filter) {
      data.sortPrice = filter.sortPrice;
      if (categoryId == 0) {
        data.categoryId = filter.category;
      }
    }
    getBook(data)
      .then(res => {
        let data = res.data.data.data;
        let temp: BookInfo[] = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
          }
          setLength(res.data.data.total);
          setListBook(listBook => [...listBook, ...temp]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //get search result
  useEffect(() => {
    getResult();
  }, [searchText, page, filter]);

  const renderResult = () => {
    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Đang tải...</Text>
        </View>
      );
    } else {
      if (length == 0) {
        return (
          <View style={styles.noResult}>
            <Image source={require('../assets/images/NoResult.png')} />
            <Text>Không có kết quả phù hợp</Text>
          </View>
        );
      } else {
        return (
          <View style={{flex: 1}}>
            <Text style={styles.result}>
              Có <Text style={styles.resultNumber}>{length}</Text> kết quả phù
              hợp
            </Text>

            <FlatList
              columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  setPage(page + 1);
                }
              }}
              scrollEventThrottle={400}
              numColumns={2}
              data={listBook}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={styles.book}>
                  <BookComponent
                    name={item.name}
                    thumbnail={item.thumbnail}
                    finalPrice={item.finalPrice}
                    originPrice={item.originPrice}
                    id={item.id}
                  />
                </View>
              )}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        );
      }
    }
  };
  const close = () => {
    setShowFilter(false);
  };

  const confirmFilter = (categoryIdNew: number, sortPrice: string) => {
    setListBook([]);
    setCategoryId(0);
    setPage(1);
    if (categoryIdNew == 0) {
      setFilter({
        category: categoryId,
        sortPrice: sortPrice,
      });
    } else {
      setFilter({
        category: categoryIdNew,
        sortPrice: sortPrice,
      });
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showFilter}
        onRequestClose={() => {
          setShowFilter(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.resultNumber}>Bộ Lọc</Text>
            <TouchableOpacity onPress={close}>
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>

          <ModalFilter setFilter={confirmFilter} />
        </View>
      </Modal>
      <View style={styles.header}>
        <View style={styles.cart}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setNewText}
            onEndEditing={searchBook}
            defaultValue={newText}
            underlineColor="transparent"
            right={<TextInput.Icon name="magnify" onPress={searchBook} />}
          />
        </View>
        <View style={styles.cart}>
          <TouchableOpacity onPress={() => setShowFilter(true)}>
            <Image source={require('../assets/icons/Filter.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filter}></View>
      {renderResult()}
    </View>
  );
};
const styles = StyleSheet.create({
  book: {
    marginBottom: 20,
  },
  modal: {
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    flex: 1,
  },
  modalHeader: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  homeScreen: {
    width: '100%',
    paddingBottom: 10,
  },
  header: {
    height: 70,
    backgroundColor: theme.colors.green,
    flexDirection: 'row',
  },
  search: {
    marginVertical: 10,
    marginStart: 20,
    width: '70%',
  },
  searchInput: {
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderRadius: 7,
    fontSize: 16,
    fontWeight: '400',
  },
  cart: {
    marginVertical: 10,
    marginStart: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  filter: {},
  result: {
    marginTop: 20,
    marginStart: 20,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: theme.colors.darkGrey,
  },
  resultNumber: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.green,
  },
  listBook: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchBook;
