import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../theme/colors';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';
import Price from '../../components/shared/Price';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const getResponsiveValue = (mobile: number, web: number) => 
  isWeb ? web : mobile;

// ============ DADOS FICTÍCIOS ============

const BANNERS = [
  { id: '1', title: 'Fornecedores Certificados', subtitle: 'Qualidade garantida', color: '#FF6B6B' },
  { id: '2', title: 'Entrega Rápida', subtitle: 'Em até 24 horas', color: '#4ECDC4' },
  { id: '3', title: 'Preços Competitivos', subtitle: 'Melhores do mercado', color: '#45B7D1' },
  { id: '4', title: 'Produtos Frescos', subtitle: 'Direto do produtor', color: '#96CEB4' },
  { id: '5', title: 'Sem Intermediários', subtitle: 'Economia garantida', color: '#FFEAA7' },
  { id: '6', title: 'Variedade Premium', subtitle: '500+ produtos', color: '#DDA15E' },
  { id: '7', title: 'Suporte 24/7', subtitle: 'Sempre à disposição', color: '#BC6C25' },
  { id: '8', title: 'Sistema Seguro', subtitle: 'Pagamentos protegidos', color: '#6C5B7B' },
  { id: '9', title: 'Rastreabilidade Total', subtitle: 'Transparência completa', color: '#355C7D' },
  { id: '10', title: 'Eco-Friendly', subtitle: 'Embalagens sustentáveis', color: '#2A9D8F' },
];

const CATEGORIES = [
  { id: '1', name: 'Hortifruti Premium', icon: '🥬', color: '#96CEB4' },
  { id: '2', name: 'Frios & Laticínios', icon: '🧀', color: '#FFEAA7' },
  { id: '3', name: 'Carnes Nobres', icon: '🥩', color: '#FF6B6B' },
  { id: '4', name: 'Mercearia Seca', icon: '🛢️', color: '#DDA15E' },
  { id: '5', name: 'Embalagens', icon: '📦', color: '#9D84B7' },
  { id: '6', name: 'Panificação', icon: '🥖', color: '#F4A460' },
  { id: '7', name: 'Vegan & Healthy', icon: '🥗', color: '#6BCB77' },
  { id: '8', name: 'Importados', icon: '🌍', color: '#4D96FF' },
  { id: '9', name: 'Bebidas', icon: '🍹', color: '#FF6B9D' },
  { id: '10', name: 'Peixes & Mariscos', icon: '🐟', color: '#4ECDC4' },
  { id: '11', name: 'Grãos & Cereais', icon: '🌾', color: '#C9ADA7' },
  { id: '12', name: 'Temperos & Condimentos', icon: '🌶️', color: '#F94144' },
  { id: '13', name: 'Sobremesas & Doces', icon: '🍰', color: '#F8961E' },
  { id: '14', name: 'Gourmet', icon: '✨', color: '#FFB703' },
  { id: '15', name: 'Molhos & Conservas', icon: '🥫', color: '#FB5607' },
  { id: '16', name: 'Orgânicos', icon: '🌱', color: '#8ECB8C' },
  { id: '17', name: 'Limpeza Food Service', icon: '🧹', color: '#90BE6D' },
  { id: '18', name: 'Descartáveis', icon: '🛡️', color: '#577590' },
  { id: '19', name: 'Padaria Industrial', icon: '🥐', color: '#F9A825' },
  { id: '20', name: 'Food Service Mix', icon: '🍽️', color: '#E63946' },
];

const PRODUCTS = [
  { id: '1', name: 'Alface Premium Hidropônica', category: 'Hortifruti Premium', description: 'Folhas tenras e crocantes', image: '🥬' },
  { id: '2', name: 'Queijo Meia Cura Artesanal', category: 'Frios & Laticínios', description: 'Produção tradicional', image: '🧀' },
  { id: '3', name: 'Filé Mignon Angus', category: 'Carnes Nobres', description: 'Grau premium importado', image: '🥩' },
  { id: '4', name: 'Azeite Extra Virgem Premium', category: 'Mercearia Seca', description: 'Primeira extração a frio', image: '🫒' },
  { id: '5', name: 'Embalagem Kraft 500g', category: 'Embalagens', description: 'Biodegradável e sustentável', image: '📦' },
  { id: '6', name: 'Pão Francês Tradicional', category: 'Panificação', description: 'Feito diariamente', image: '🥖' },
  { id: '7', name: 'Mix de Saladas Orgânicas', category: 'Vegan & Healthy', description: 'Sem pesticidas', image: '🥗' },
  { id: '8', name: 'Chocolate Belga Premium', category: 'Importados', description: '70% cacau puro', image: '🍫' },
  { id: '9', name: 'Suco Natural de Laranja', category: 'Bebidas', description: 'Espremido na hora', image: '🍹' },
  { id: '10', name: 'Camarão Rosa Fresco', category: 'Peixes & Mariscos', description: 'Entrega 24h', image: '🐟' },
  { id: '11', name: 'Arroz Integral Orgânico', category: 'Grãos & Cereais', description: '100% natural', image: '🌾' },
  { id: '12', name: 'Pimenta Malagueta Desidratada', category: 'Temperos & Condimentos', description: 'Sabor intenso', image: '🌶️' },
  { id: '13', name: 'Brigadeiro Gourmet Premium', category: 'Sobremesas & Doces', description: 'Receita clássica aperfeiçoada', image: '🍰' },
  { id: '14', name: 'Trufas de Chocolate Belga', category: 'Gourmet', description: 'Presenteáveis', image: '✨' },
  { id: '15', name: 'Molho de Tomate Caseiro', category: 'Molhos & Conservas', description: 'Sem aditivos químicos', image: '🥫' },
  { id: '16', name: 'Espinafre Orgânico Congelado', category: 'Orgânicos', description: 'Colhido na época', image: '🌱' },
  { id: '17', name: 'Detergente Neutro Food Safe', category: 'Limpeza Food Service', description: 'Aprox. para alimentos', image: '🧹' },
  { id: '18', name: 'Garfo Descartável Biodegradável', category: 'Descartáveis', description: 'Resistente e eco-amigo', image: '🛡️' },
  { id: '19', name: 'Croissant Congelado Pré-assado', category: 'Padaria Industrial', description: 'Rápido e prático', image: '🥐' },
  { id: '20', name: 'Kit Completo Food Service', category: 'Food Service Mix', description: 'Tudo que você precisa', image: '🍽️' },
];

type OnboardingScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const { loginAsCustomer, loginAsSupplier } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text.toLowerCase());
  };

  const filteredProducts = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery)
  );

  const filteredCategories = CATEGORIES.filter(
    (c) => c.name.toLowerCase().includes(searchQuery)
  );

  const displayCategories = searchQuery ? filteredCategories : CATEGORIES;
  const displayProducts = searchQuery ? filteredProducts : PRODUCTS;

  const renderBanner = ({ item }: any) => (
    <View style={[styles.bannerCard, { backgroundColor: item.color }]}>
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.bannerIcon}>
        <Ionicons name="arrow-forward" size={32} color="#FFFFFF" />
      </View>
    </View>
  );

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIconContainer, { backgroundColor: item.color }]}>
        <Text style={styles.categoryIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: any) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Text style={styles.productImage}>{item.image}</Text>
      </View>
      <View style={styles.productContent}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Price value={0} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={getResponsiveValue(28, 36)} color={colors.primary} />
            <Text style={styles.logoText}>LocalBox</Text>
          </View>
          <Text style={styles.tagline}>Distribuição Premium para Foodservice</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={20} color={colors.textLight} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar produtos ou categorias…"
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
        </View>

        {/* Banners Carrossel */}
        {!searchQuery && (
          <View style={styles.bannersSection}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
            >
              {BANNERS.map((banner) => (
                <View key={banner.id} style={{ width }}>
                  {renderBanner({ item: banner })}
                </View>
              ))}
            </ScrollView>
            <View style={styles.dotsContainer}>
              {BANNERS.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { opacity: index === currentBannerIndex ? 1 : 0.4 },
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {/* Categorias */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📦 Categorias</Text>
            <FlatList
              data={displayCategories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              numColumns={isWeb ? 5 : 3}
              scrollEnabled={false}
              columnWrapperStyle={styles.categoriesRow}
            />
          </View>
        )}

        {/* Produtos em Destaque / Resultados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `🔍 Resultados para "${searchQuery}"` : '⭐ Produtos em Destaque'}
          </Text>
          {displayProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={colors.textLight} />
              <Text style={styles.emptyStateText}>Nenhum produto encontrado</Text>
            </View>
          ) : (
            <FlatList
              data={displayProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={isWeb ? 4 : 2}
              scrollEnabled={false}
              columnWrapperStyle={styles.productsRow}
            />
          )}
        </View>

        {/* CTA Explicativo */}
        {!searchQuery && (
          <View style={styles.ctaSection}>
            <View style={styles.ctaContent}>
              <Ionicons name="lock-closed" size={40} color={colors.primary} style={{ marginBottom: 12 }} />
              <Text style={styles.ctaTitle}>Acesso exclusivo aos preços</Text>
              <Text style={styles.ctaDescription}>
                Distribuidores e fornecedores do setor food têm acesso a preços especiais e condições diferenciadas. Cadastre-se agora.
              </Text>
            </View>
          </View>
        )}

        {/* Botões CTA */}
        <View style={styles.buttonsSection}>
          <Button
            title="Fazer Login"
            onPress={() => navigation.navigate('Login')}
          />
          <View style={{ height: 12 }} />
          <Button
            title="Criar Cadastro para Ver Preços"
            variant="secondary"
            onPress={() => navigation.navigate('RegisterType')}
          />
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Plataforma segura com pagamentos protegidos e rastreabilidade total de fornecedores.
          </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    paddingVertical: getResponsiveValue(20, 28),
    paddingHorizontal: getResponsiveValue(16, 32),
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: getResponsiveValue(28, 36),
    fontWeight: '800',
    color: colors.primary,
    marginLeft: 10,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: getResponsiveValue(12, 14),
    color: colors.textLight,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: getResponsiveValue(16, 32),
    paddingVertical: getResponsiveValue(16, 20),
    backgroundColor: colors.surface,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '400',
  },
  bannersSection: {
    marginVertical: 16,
  },
  bannerCard: {
    marginHorizontal: getResponsiveValue(16, 32),
    marginVertical: 8,
    borderRadius: 16,
    paddingVertical: getResponsiveValue(24, 32),
    paddingHorizontal: getResponsiveValue(20, 28),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.medium,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: getResponsiveValue(18, 22),
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: getResponsiveValue(13, 15),
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  bannerIcon: {
    marginLeft: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  section: {
    paddingHorizontal: getResponsiveValue(16, 32),
    marginBottom: getResponsiveValue(28, 36),
  },
  sectionTitle: {
    fontSize: getResponsiveValue(20, 24),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  categoriesRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: getResponsiveValue(4, 8),
    marginBottom: getResponsiveValue(12, 16),
  },
  categoryIconContainer: {
    width: getResponsiveValue(56, 72),
    height: getResponsiveValue(56, 72),
    borderRadius: getResponsiveValue(28, 36),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.small,
  },
  categoryIcon: {
    fontSize: getResponsiveValue(28, 36),
  },
  categoryName: {
    fontSize: getResponsiveValue(11, 13),
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 14,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: getResponsiveValue(4, 8),
    marginBottom: getResponsiveValue(12, 16),
    overflow: 'hidden',
    ...shadows.small,
  },
  productImageContainer: {
    backgroundColor: '#F3F4F6',
    height: getResponsiveValue(100, 140),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  productImage: {
    fontSize: getResponsiveValue(36, 48),
  },
  productContent: {
    padding: getResponsiveValue(10, 14),
  },
  productName: {
    fontSize: getResponsiveValue(13, 15),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 16,
  },
  productCategory: {
    fontSize: getResponsiveValue(11, 12),
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 6,
  },
  productDescription: {
    fontSize: getResponsiveValue(10, 12),
    color: colors.textLight,
    marginBottom: 8,
    lineHeight: 14,
  },
  priceContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  ctaSection: {
    marginHorizontal: getResponsiveValue(16, 32),
    marginBottom: 28,
    padding: getResponsiveValue(20, 28),
    backgroundColor: 'rgba(30, 64, 175, 0.05)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    alignItems: 'center',
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: getResponsiveValue(16, 18),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: getResponsiveValue(13, 15),
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonsSection: {
    paddingHorizontal: getResponsiveValue(16, 32),
    marginBottom: 24,
  },
  footerInfo: {
    paddingHorizontal: getResponsiveValue(16, 32),
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: getResponsiveValue(12, 13),
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 12,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 40,
  },
});
