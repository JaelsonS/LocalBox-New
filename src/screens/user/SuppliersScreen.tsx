
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MOCK_SUPPLIERS } from '../../constants/mockSuppliers';
import { MOCK_PRODUCTS } from '../../constants/mockProducts';
import SupplierCard from '../../components/customer/SupplierCard';
import Button from '../../components/shared/Button';
import Price from '../../components/shared/Price';

type Props = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, any>;
};

export default function SuppliersScreen({ navigation, route }: Props) {
  const supplierId = route.params?.supplierId as string | undefined;
  const supplier = MOCK_SUPPLIERS.find(s => s.id === supplierId) || MOCK_SUPPLIERS[0];

  const products = MOCK_PRODUCTS.filter(p => p.supplierId === supplier.id);

  return (
    <View style={styles.container}>
      <SupplierCard supplier={supplier} />

      <Text style={styles.sectionTitle}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={p => p.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
            </View>
            <View style={styles.productActions}>
              <Price value={item.price} />
              <View style={{ height: 8 }} />
              <Button title="Ver" onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 12, marginLeft: 16 },
  productItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#EFEFEF' },
  productName: { fontSize: 14, fontWeight: '700', color: '#111' },
  productDesc: { fontSize: 12, color: '#666', marginTop: 4 },
  productActions: { alignItems: 'flex-end' },
});

