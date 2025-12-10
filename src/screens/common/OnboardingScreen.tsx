import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../theme/colors';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const getResponsiveValue = (mobile: number, web: number) => 
  isWeb ? web : mobile;

type OnboardingScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const { loginAsCustomer, loginAsSupplier } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={getResponsiveValue(32, 40)} color={colors.primary} />
            <Text style={styles.logoText}>LocalBox</Text>
          </View>
          <Text style={styles.tagline}>Marketplace de Produtores Locais para Foodservice</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Conectamos Produtores Locais{'\n'}com o Setor Foodservice
            </Text>
            <Text style={styles.heroDescription}>
              Plataforma exclusiva para restaurantes, hotéis e estabelecimentos gastronômicos 
              encontrarem os melhores produtos locais diretamente dos produtores.
            </Text>
          </View>
          {isWeb && (
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop' }}
              style={styles.heroImage}
            />
          )}
        </View>

        {/* Quick Entry Options (Main CTA) */}
        <View style={styles.quickOptions}>
          <Text style={styles.quickOptionsTitle}>Como deseja entrar?</Text>
          <Text style={styles.quickOptionsSubtitle}>Escolha uma opção para começar:</Text>
          <View style={styles.quickOptionsRow}>
            <Button 
              title="1 — Explorar" 
              onPress={() => navigation.navigate('GuestHome')} 
            />
            <View style={{ height: 12 }} />
            <Button 
              title="2 — Cliente" 
              variant="secondary" 
              onPress={() => { loginAsCustomer(); }} 
            />
            <View style={{ height: 12 }} />
            <Button 
              title="3 — Fornecedor" 
              variant="outline" 
              onPress={() => { loginAsSupplier(); }} 
            />
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>✨ Por que escolher o LocalBox?</Text>
          
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Ionicons name="restaurant" size={40} color={colors.primary} />
              <Text style={styles.benefitTitle}>Para Foodservice</Text>
              <Text style={styles.benefitText}>
                Pedidos em volume, entrega programada, controle de estoque integrado, 
                suporte dedicado para estabelecimentos.
              </Text>
            </View>
            
            <View style={styles.benefitCard}>
              <Ionicons name="business" size={40} color={colors.primary} />
              <Text style={styles.benefitTitle}>Para Fornecedores</Text>
              <Text style={styles.benefitText}>
                Alcance novos mercados, venda direta sem intermediários, 
                gestão simplificada de pedidos, análise de desempenho.
              </Text>
            </View>
            
            <View style={styles.benefitCard}>
              <Ionicons name="leaf" size={40} color={colors.primary} />
              <Text style={styles.benefitTitle}>Sustentabilidade</Text>
              <Text style={styles.benefitText}>
                Produtos locais e sazonais, menor pegada ecológica, 
                apoio à economia local, embalagens sustentáveis.
              </Text>
            </View>
            
            <View style={styles.benefitCard}>
              <Ionicons name="trending-up" size={40} color={colors.primary} />
              <Text style={styles.benefitTitle}>Crescimento</Text>
              <Text style={styles.benefitText}>
                Plataforma em expansão, novos produtores toda semana, 
                parcerias estratégicas, inovação constante.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: getResponsiveValue(30, 40),
    paddingBottom: getResponsiveValue(20, 25),
    paddingHorizontal: getResponsiveValue(20, 40),
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...shadows.medium,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: getResponsiveValue(36, 48),
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 15,
  },
  tagline: {
    fontSize: getResponsiveValue(14, 16),
    color: colors.textLight,
    textAlign: 'center',
    maxWidth: 600,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: getResponsiveValue(100, 150),
  },
  heroSection: {
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: 'center',
    paddingHorizontal: getResponsiveValue(20, 40),
    paddingVertical: getResponsiveValue(30, 50),
    backgroundColor: colors.primary,
    marginHorizontal: getResponsiveValue(20, 40),
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 25,
    ...shadows.large,
  },
  heroContent: {
    flex: 1,
    paddingRight: isWeb ? 40 : 0,
  },
  heroTitle: {
    fontSize: getResponsiveValue(24, 32),
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 20,
    lineHeight: getResponsiveValue(30, 40),
  },
  heroDescription: {
    fontSize: getResponsiveValue(14, 16),
    color: colors.surface,
    opacity: 0.9,
    lineHeight: getResponsiveValue(20, 24),
    marginBottom: 30,
  },
  heroImage: {
    width: isWeb ? 400 : '100%',
    height: isWeb ? 250 : 200,
    borderRadius: 15,
  },
  quickOptions: {
    paddingHorizontal: getResponsiveValue(20, 40),
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  quickOptionsTitle: {
    fontSize: getResponsiveValue(18, 22),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  quickOptionsSubtitle: {
    fontSize: getResponsiveValue(13, 15),
    color: colors.textLight,
    marginBottom: 12,
  },
  quickOptionsRow: {
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  benefitsSection: {
    paddingHorizontal: getResponsiveValue(20, 40),
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: getResponsiveValue(20, 28),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 25,
  },
  benefitsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: isWeb ? (Dimensions.get('window').width / 4) - 30 : '100%',
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    ...shadows.small,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 50,
  },
});
