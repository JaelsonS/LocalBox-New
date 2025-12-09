import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Platform, StyleSheet, View } from 'react-native';

// Componente para web com scroll funcionando
function WebContainer({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.webContainer}>
      <View style={styles.webContent}>
        {children}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <WebContainer>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    width: '100%',
    height: '100vh',
    overflow: 'auto',
  },
  webContent: {
    width: '100%',
    minHeight: '100vh',
  },
});