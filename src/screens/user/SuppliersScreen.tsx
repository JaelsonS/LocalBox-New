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
  TextInput,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, shadows } from '../../theme/colors';

type SuppliersScreenProps = {
  navigation: StackNavigationProp<any>;
};

// Dados mock de fornecedores
const suppliersData = [
  {
    id: '1',
    name: 'Quinta do Vale',
    category: 'Vinhos Premium',
    location: 'Alentejo, Portugal',
    rating: 4.8,
    productsCount: 24,
    verified: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
    description: 'Produtor familiar há 3 gerações, especializado em vinhos tintos premium.',
    distance: 2.5,
  },
  {
    id: '2',
    name: 'Cervejaria Artesanal',
    category: 'Cervejas Especiais',
    location: 'Porto, Portugal',
    rating: 4.6,
    productsCount: 18,
    verified: true,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop',
    description: 'Microcervejaria focada em cervejas IPA e Stout artesanais.',
    distance: 3.1,
  },
  {
    id: '3',
    name: 'Queijaria Tradicional',
    category: 'Queijos DOP',
    location: 'Serra da Estrela',
    rating: 4.9,
    productsCount: 12,
    verified: true,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop',
    description: 'Queijos artesanais com Denominação de Origem Protegida.',
    distance: 5.2,
  },
  {
    id: '4',
    name: 'Apiário Natural',
    category: 'Mel e Derivados',
    location: 'Trás-os-Montes',
    rating: 4.7,
    productsCount: 15,
    verified: true,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&h=300&fit=crop',
    description: 'Mel puro de rosmaninho e outras flores silvestres.',
    distance: 1.8,
  },
  {
    id: '5',
    name: 'Horta Biológica',
    category: 'Legumes Orgânicos',
    location: 'Ribatejo',
    rating: 4.5,
    productsCount: 32,
    verified: false,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    description: 'Produtos agrícolas 100% biológicos, sem pesticidas.',
    distance: 4.3,
  },
  {
    id: '6',
    name: 'Padaria Rural',
    category: 'Pães Artesanais',
    location: 'Minho',
    rating: 4.4,
    productsCount: 8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    description: 'Forno a lenha, pães feitos com farinha tradicional.',
    distance: 6.7,
  },
];

const categories = [
  'Todos',
  'Vinhos',
  'Cervejas',
  'Queijos',
  'Regionais',
  'Orgânicos',
  'Verificados',
];

export default function SuppliersScreen({ navigation }: SuppliersScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredSuppliers = suppliersData.filter(supplier => {
    // Filtro por busca
    if (searchQuery && !supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !supplier.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtro por categoria
    if (selectedCategory !== 'Todos' && 
        selectedCategory !== 'Verificados' &&
        !supplier.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    
    // Filtro por verificação
    if (showVerifiedOnly && !supplier.verified) {
      return false;
    }
    
    return true;
  });

  const renderSupplierItem = ({ item }: { item: typeof suppliersData[0] }) => (
    <TouchableOpacity 
      style={styles.supplierCard}
      onPress={() => navigation.navigate('SupplierDetail', { supplierId: item.id })}>
      
      <Image source={{ uri: item.image }} style={styles.supplierImage} />
      
      <View style={styles.supplierInfo}>
        <View style={styles.supplierHeader}>
          <View style={styles.supplierNameContainer}>
            <Text style={styles.supplierName} numberOfLines={1}>{item.name}</Text>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color={colors.surface} />
                <Text style={styles.verifiedText}>Verificado</Text>
              </View>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.supplierCategory}>{item.category}</Text>
        
        <View style={styles.supplierDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={12} color={colors.textLight} />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cube" size={12} color={colors.textLight} />
            <Text style={styles.detailText}>{item.productsCount} produtos</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="navigate" size={12} color={colors.textLight} />
            <Text style={styles.detailText}>{item.distance}km</Text>
          </View>
        </View>
        
        <Text style={styles.supplierDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <TouchableOpacity 
          style={styles.viewCatalogButton}
          onPress={() => navigation.navigate('SupplierDetail', { supplierId: item.id })}>
          <Text style={styles.viewCatalogText}>Ver Catálogo</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Fornecedores Locais</Text>
          <Text style={styles.headerSubtitle}>{filteredSuppliers.length} fornecedores encontrados</Text>
        </View>
        <TouchableOpacity style={styles.filterToggle}>
          <Ionicons name="filter" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar fornecedores..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textLighter}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filtro de Verificados */}
        <TouchableOpacity 
          style={styles.verifiedFilter}
          onPress={() => setShowVerifiedOnly(!showVerifiedOnly)}>
          <View style={[
            styles.verifiedCheckbox,
            showVerifiedOnly && styles.verifiedCheckboxChecked,
          ]}>
            {showVerifiedOnly && (
              <Ionicons name="checkmark" size={14} color={colors.surface} />
            )}
          </View>
          <Text style={styles.verifiedFilterText}>Mostrar apenas fornecedores verificados</Text>
        </TouchableOpacity>

        {/* Categorias */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextSelected,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de Fornecedores */}
        <View style={styles.suppliersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fornecedores Premium</Text>
            <Text style={styles.sectionSubtitle}>
              Ordenados por distância • {filteredSuppliers.length} resultados
            </Text>
          </View>
          
          {filteredSuppliers.length > 0 ? (
            <FlatList
              data={filteredSuppliers}
              renderItem={renderSupplierItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.suppliersList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={colors.textLight} />
              <Text style={styles.emptyStateTitle}>Nenhum fornecedor encontrado</Text>
              <Text style={styles.emptyStateText}>
                Tente ajustar os filtros ou buscar por outro termo
              </Text>
            </View>
          )}
        </View>

        {/* Info para Restaurantes */}
        <View style={styles.restaurantInfo}>
          <Ionicons name="restaurant" size={24} color={colors.primary} />
          <View style={styles.restaurantInfoContent}>
            <Text style={styles.restaurantInfoTitle}>Para Restaurantes e Hotéis</Text>
            <Text style={styles.restaurantInfoText}>
              • Contratos com fornecedores verificados{'\n'}
              • Pedidos em volume com desconto{'\n'}
              • Entrega programada e rastreável
            </Text>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...shadows.medium,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  filterToggle: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    ...shadows.small,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text,
  },
  verifiedFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingVertical: 10,
  },
  verifiedCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedCheckboxChecked: {
    backgroundColor: colors.primary,
  },
  verifiedFilterText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    ...shadows.small,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryButtonTextSelected: {
    color: colors.surface,
  },
  suppliersSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  suppliersList: {
    paddingHorizontal: 20,
  },
  supplierCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    ...shadows.medium,
  },
  supplierImage: {
    width: '100%',
    height: 150,
  },
  supplierInfo: {
    padding: 15,
  },
  supplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  supplierNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  supplierCategory: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  supplierDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  supplierDescription: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    marginBottom: 15,
  },
  viewCatalogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7EC',
    borderRadius: 10,
    paddingVertical: 10,
  },
  viewCatalogText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    ...shadows.small,
  },
  restaurantInfoContent: {
    flex: 1,
    marginLeft: 15,
  },
  restaurantInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  restaurantInfoText: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
  },
});