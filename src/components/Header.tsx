import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../theme/colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightIcon,
  onRightPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerSection}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      <View style={styles.rightSection}>
        {rightIcon && (
          <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
            <Ionicons name={rightIcon as any} size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    ...shadows.small,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 5,
  },
  rightButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
    textAlign: 'center',
  },
});