import React from 'react';
import { ScrollView, Platform, StyleSheet, View, ScrollViewProps } from 'react-native';

interface WebScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export default function WebScrollView({ children, style, ...props }: WebScrollViewProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webContainer, style]}>
        <div style={styles.webScroll}>
          {children}
        </div>
      </View>
    );
  }

  return (
    <ScrollView style={style} {...props}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    width: '100%',
  },
  webScroll: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
});