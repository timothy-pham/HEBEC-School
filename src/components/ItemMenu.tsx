import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BadgeCustom from '../components/BadgeCustom';
type itemMenu = {
  icon: any;
  title: string;
  label: string;
  onPress: () => void;
  isNotification?: boolean;
};

const renderNotification = (isNotification: any) => {
  if (isNotification) {
    return <BadgeCustom />;
  } else {
    return (
      <View style={styles.vector}>
        <Image source={require('../assets/icons/Vector.png')} />
      </View>
    );
  }
};

const ItemMenu = ({icon, title, label, onPress, isNotification}: itemMenu) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text>{label}</Text>
      <>{renderNotification(isNotification)}</>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 66,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    width: '75%',
  },
  icon: {
    marginStart: 20,
    marginEnd: 10,
  },
  vector: {},
});
export default ItemMenu;
