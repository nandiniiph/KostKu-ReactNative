import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppNavigator from '../app/navigation/AppNavigator';
import LoginOptionsScreen from '../app/screens/LoginOptionsScreen';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    // <NavigationContainer>
    //   {isAuthenticated ? <AppNavigator /> : <LoginOptionsScreen />}
    // </NavigationContainer>
    <Text>HELLO WORD!</Text>
  );
};

export default Apps;
