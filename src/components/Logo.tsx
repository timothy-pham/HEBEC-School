import {View, Image, StyleSheet} from 'react-native';
import React from 'react';

const Logo = () => {
  return (
    <View style={styles.logo}>
      <Image
        style={styles.union}
        source={require('../assets/imgs/Union.png')}
      />
      <Image source={require('../assets/imgs/School.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  union: {
    marginTop: 80,
    marginBottom: 12,
  },
});

export default Logo;
