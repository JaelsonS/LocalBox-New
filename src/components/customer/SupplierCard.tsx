import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Supplier } from '../../types/Supplier';
import colors from '../../theme/colors';

type Props = {
  supplier: Supplier;
  onPress?: () => void;
};

export default function SupplierCard({ supplier, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{supplier.name.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{supplier.name}</Text>
          <Text style={styles.category}>{supplier.category}</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{supplier.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>{supplier.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#FFF', fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  category: { fontSize: 12, color: colors.textSecondary },
  rating: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: colors.divider },
  ratingText: { fontSize: 12, color: colors.text },
  description: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
});
