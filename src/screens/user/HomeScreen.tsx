import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3E8" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
          <Text style={styles.locationText}>📍 Produtos perto de você</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Destaque */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>🍃 Produtos Locais</Text>
          <Text style={styles.sectionSubtitle}>
            Ordenados do mais barato ao mais caro
          </Text>
        </View>

        {/* Categorias */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}>
          {['🍷 Vinhos', '🍺 Cervejas', '🧀 Queijos', '🍯 Regionais', '🥖 Todos'].map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryButton}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Produtos em Destaque */}
        <View style={styles.productsSection}>
          <Text style={styles.productsTitle}>Melhores Preços Próximos</Text>
          
          {[
            { name: 'Vinho Tinto Reserva', price: '€12,50', distance: '2,5km' },
            { name: 'Cerveja Artesanal IPA', price: '€4,20', distance: '3,1km' },
            { name: 'Queijo Serra da Estrela', price: '€8,90', distance: '5,2km' },
            { name: 'Mel de Rosmaninho', price: '€6,50', distance: '1,8km' },
          ].map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.productEmoji}>📦</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productDetails}>
                  <Text style={styles.productDistance}>📍 {product.distance}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão de voltar */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar para Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3E8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  locationText: {
    fontSize: 14,
    color: '#5A7D45',
    marginTop: 5,
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A7D45',
  },
  productsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B1B1B',
    marginBottom: 15,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F0F7EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productEmoji: {
    fontSize: 24,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B1B1B',
    marginBottom: 5,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productDistance: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A7D45',
  },
  backButton: {
    alignSelf: 'center',
    padding: 15,
    marginBottom: 30,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5A7D45',
    fontWeight: '600',
  },
});