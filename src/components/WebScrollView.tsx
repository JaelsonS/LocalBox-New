import React from 'react';
import { ScrollView, Platform, StyleSheet, View, ScrollViewProps } from 'react-native';

interface WebScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export default function WebScrollView({ children, style, ...props }: WebScrollViewProps) {
  if (Platform.OS === 'web') {
    // StyleSheet.create retorna referências internas que não podem ser usadas
    // diretamente em elementos DOM. Flatten transforma em objeto plain JS.
  const webScrollStyle = webOnlyStyles.webScroll;

    return (
      <View style={[styles.webContainer, style]}>
        <div style={webScrollStyle}>
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
});

// Estilos específicos para o DOM (não devem usar StyleSheet.create porque
// contêm propriedades CSS não suportadas pelo tipo ViewStyle do RN).
const webOnlyStyles: { webScroll: React.CSSProperties } = {
  webScroll: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
};