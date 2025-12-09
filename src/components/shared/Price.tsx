import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import colors from '../../theme/colors';

type PriceProps = {
  value: number;
  currency?: string;
};

export default function Price({ value, currency = '€' }: PriceProps) {
  const { user } = useAuth();

  if (!user) {
    return <Text style={styles.placeholder}>Faça login para ver preços</Text>;
  }

  return <Text style={styles.price}>{currency}{value.toFixed(2)}</Text>;
}

const styles = StyleSheet.create({
  placeholder: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  price: {
    color: colors.primary,
    fontWeight: '700',
  },
});
