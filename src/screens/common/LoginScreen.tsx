import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/shared/Button';
import { useAuth } from '../../hooks/useAuth';

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { loginAsCustomer, loginAsSupplier } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <View style={styles.actions}>
        <Button title="Entrar como Cliente" onPress={() => loginAsCustomer()} />
        <View style={{ height: 12 }} />
        <Button title="Entrar como Fornecedor" variant="secondary" onPress={() => loginAsSupplier()} />
        <View style={{ height: 12 }} />
        <Button title="Registrar" variant="outline" onPress={() => navigation.navigate('RegisterType')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  actions: { width: '100%', maxWidth: 420 },
});
