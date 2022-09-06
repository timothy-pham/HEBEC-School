import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../core/theme';

type Props = {
  setFilter: (category: number, sortPrice: string) => void;
};
const ModalFilter = ({setFilter}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    {label: 'Sách Giáo Khoa', value: 11},
    {label: 'Sách Tham Khảo', value: 31},
    {label: 'Sách Giáo Viên', value: 97},
    {label: 'VP.Phẩm-Đồ dùng HS', value: 27},
    {label: 'Ngoại ngữ - Từ điển', value: 8},
    {label: 'Kinh tế', value: 7},
    {label: 'Đời  Sống - Tâm Lý', value: 9},
    {label: 'Bách Hóa - Lưu Niệm', value: 13},
    {label: 'Sách Thiếu Nhi', value: 4},
    {label: 'Sách Mầm Non - Mẫu Giáo', value: 115},
    {label: 'Máy Tính', value: 119},
    {label: 'Đồ chơi', value: 16},
    {label: 'Văn học', value: 6},
    {label: 'Kiến Thức - Khoa Học', value: 117},
    {label: 'C.Trị - Pháp Lý - Triết Học', value: 118},
    {label: 'Âm Nhạc - Mỹ Thuật - Thời Trang', value: 179},
    {label: 'Nữ Công Gia Chánh - Mẹo Vặt - Cẩm Nang', value: 180},
    {label: 'Lịch Sử - Văn Hóa - Địa Lý', value: 182},
    {label: 'Nuôi Dạy Trẻ', value: 204},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('1');
  const [items2, setItems2] = useState([
    {label: 'Lớp 1', value: '1'},
    {label: 'Lớp 2', value: '2'},
    {label: 'Lớp 3', value: '3'},
    {label: 'Lớp 4', value: '4'},
    {label: 'Lớp 5', value: '5'},
    {label: 'Lớp 6', value: '6'},
    {label: 'Lớp 7', value: '7'},
    {label: 'Lớp 8', value: '8'},
    {label: 'Lớp 9', value: '9'},
    {label: 'Lớp 10', value: '10'},
    {label: 'Lớp 11', value: '11'},
    {label: 'Lớp 12', value: '12'},
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState('ASC');
  const [items3, setItems3] = useState([
    {label: 'Từ thấp đến cao', value: 'ASC'},
    {label: 'Từ cao đến thấp', value: 'DESC'},
  ]);

  const setDefault = () => {
    setValue(0);
    setValue2('1');
    setValue3('ASC');
  };

  const confirm = () => {
    setFilter(value, value3);
  };
  return (
    <View style={styles.modalFilter}>
      <View style={[styles.modalBox]}>
        <Text style={styles.name}>Loại sách</Text>
        <View style={{width: '60%'}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            theme="LIGHT"
            zIndex={100}
          />
        </View>
      </View>
      <View style={[styles.modalBox]}>
        <Text style={styles.name}>Lớp</Text>
        <View style={{width: '60%'}}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            theme="LIGHT"
            zIndex={80}
          />
        </View>
      </View>
      <View style={[styles.modalBox]}>
        <Text style={styles.name}>Giá</Text>
        <View style={{width: '60%'}}>
          <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            theme="LIGHT"
            zIndex={70}
          />
        </View>
      </View>
      <View style={styles.modalButton}>
        <TouchableOpacity onPress={setDefault}>
          <View style={styles.noButton}>
            <Text style={styles.noText}>Xoá</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirm}>
          <View style={styles.yesButton}>
            <Text style={styles.yesText}>Áp dụng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalFilter: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  modalBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultNumber: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.green,
  },
  name: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: theme.colors.darkGrey,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  noButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.green,
  },
  yesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 50,
    backgroundColor: theme.colors.green,
    borderRadius: 7,
  },
  noText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.green,
  },
  yesText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
});

export default ModalFilter;
