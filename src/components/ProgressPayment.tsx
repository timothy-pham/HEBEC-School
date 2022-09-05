import React from 'react';
import {Image, View} from 'react-native';
import theme from '../core/theme';

type Step = {
  currentStep: number;
};
const ProgressPayment = ({currentStep}: Step) => {
  if (currentStep === 1) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/progress/Step1.png')} />
        <View
          style={{
            backgroundColor: theme.colors.grey,
            width: 60,
            height: 3,
          }}></View>
        <Image source={require('../assets/progress/Step2Disable.png')} />
        <View
          style={{
            backgroundColor: theme.colors.grey,
            width: 60,
            height: 3,
          }}></View>
        <Image source={require('../assets/progress/Step3Disable.png')} />
      </View>
    );
  } else if (currentStep === 2) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/progress/Done.png')} />
        <View
          style={{
            backgroundColor: theme.colors.green,
            width: 60,
            height: 3,
          }}></View>
        <Image source={require('../assets/progress/Step2Enable.png')} />
        <View
          style={{
            backgroundColor: theme.colors.grey,
            width: 60,
            height: 3,
          }}></View>
        <Image source={require('../assets/progress/Step3Disable.png')} />
      </View>
    );
  } else if (currentStep === 3) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/progress/Done.png')} />
        <View
          style={{
            backgroundColor: theme.colors.green,
            width: 60,
            height: 3,
          }}></View>
        <Image source={require('../assets/progress/Done.png')} />
        <View
          style={{
            backgroundColor: theme.colors.green,
            width: 60,
            height: 3,
          }}></View>
        <Image source={require('../assets/progress/Step3Enable.png')} />
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../assets/progress/Step1.png')} />
      <View
        style={{
          backgroundColor: theme.colors.grey,
          width: 60,
          height: 3,
        }}></View>
      <Image source={require('../assets/progress/Step2Disable.png')} />
      <View
        style={{
          backgroundColor: theme.colors.grey,
          width: 60,
          height: 3,
        }}></View>
      <Image source={require('../assets/progress/Step3Disable.png')} />
    </View>
  );
};

export default ProgressPayment;
