
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { MOCK_SUPPLIERS } from '../../constants/mockSuppliers';
import SupplierCard from '../../components/customer/SupplierCard';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_SUPPLIERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SupplierCard supplier={item} onPress={() => navigation.navigate('Suppliers', { supplierId: item.id })} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
});

