import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BadgeCustom = () => {
  return (
    <View style={styles.badge}>
      <Text style={styles.count}>2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    height: 21,
    width: 30,
    paddingHorizontal: 10,
    paddingVertical: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F44336',
  },
  count: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 19,
    color: 'white',
  },
});

export default BadgeCustom;
