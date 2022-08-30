import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext';
import Navigator from './src/navigation/navigation';
import theme from './src/core/theme';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.lightGrey,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
