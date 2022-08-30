import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const Payment = () => {
  const [stepScreen, setStepScreen] = useState<any>();
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    if (currentStep === 1) {
      setStepScreen(<Text>Step 1</Text>);
    } else if (currentStep === 2) {
      setStepScreen(<Text>Step 2</Text>);
    } else if (currentStep === 3) {
      setStepScreen(<Text>Step 3</Text>);
    }
  }, [currentStep]);
  return <View>{stepScreen}</View>;
};

export default Payment;
