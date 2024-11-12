// app/index.jsx
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppNavigator from './navigation/AppNavigator';
import LoginOptionsScreen from './screens/LoginOptionsScreen';
import { NavigationContainer } from '@react-navigation/native';

const Layout = () => {
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
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <LoginOptionsScreen />}
    </NavigationContainer>
  );
};

export default Layout;
