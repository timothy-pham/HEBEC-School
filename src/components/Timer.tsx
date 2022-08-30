import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../core/theme';

const CountDownTimer = () => {
  const [countdown, setCountdown] = useState(2);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCountdown(prevState => prevState - 1);
    }, 1000);
    if (countdown === 0) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [countdown]);
  let countdownText;
  if (countdown > 0) {
    countdownText = (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.waiting}>Gửi lại yêu cầu khôi phục mật khẩu </Text>
        <Text style={styles.textResend}>({countdown}s)</Text>
      </View>
    );
  } else {
    countdownText = (
      <View>
        <Text style={styles.textResend}>
          Gửi lại yêu cầu khôi phục mật khẩu{' '}
        </Text>
      </View>
    );
  }
  return <View style={styles.resend}>{countdownText}</View>;
};

const styles = StyleSheet.create({
  waiting: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    color: theme.colors.mediumGrey,
  },
  resend: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResend: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    color: theme.colors.green,
  },
});

export default CountDownTimer;
