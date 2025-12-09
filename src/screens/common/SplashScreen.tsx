import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function SplashScreen({ navigation }: SplashScreenProps) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3E8" />
      <View style={styles.content}>
        <Text style={styles.logo}>🏪 LocalBox</Text>
        <Text style={styles.slogan}>Produtos locais direto do produtor</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3E8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5A7D45',
    marginBottom: 20,
  },
  slogan: {
    fontSize: 18,
    color: '#1B1B1B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});