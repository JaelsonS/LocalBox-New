
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MOCK_PRODUCTS } from '../../constants/mockProducts';
import Price from '../../components/shared/Price';
import Button from '../../components/shared/Button';

type Props = {
  route: RouteProp<any, any>;
};

export default function ProductScreen({ route }: Props) {
  const productId = route.params?.productId as string | undefined;
  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <View style={{ height: 12 }} />
      <Price value={product.price} />
      <View style={{ height: 16 }} />
      <Button title="Adicionar ao Carrinho" onPress={() => { /* TODO: adicionar ao carrinho */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  title: { fontSize: 20, fontWeight: '700', color: '#111' },
  desc: { fontSize: 14, color: '#666', marginTop: 8 },
});

