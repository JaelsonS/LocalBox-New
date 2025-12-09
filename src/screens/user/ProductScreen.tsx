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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, shadows } from '../../theme/colors';

const { width } = Dimensions.get('window');

type DashboardScreenProps = {
  navigation: StackNavigationProp<any>;
};

// Dados mock
const stats = {
  activeProducts: 12,
  sales: 156,
  revenue: 3250.50,
  views: 2345,
  conversion: 6.7,
};

const recentOrders = [
  { id: '1', customer: 'Restaurante Solar', amount: 245.90, status: 'entregue', date: 'Hoje' },
  { id: '2', customer: 'Hotel Montanha', amount: 189.50, status: 'processando', date: 'Ontem' },
  { id: '3', customer: 'Casa do Chef', amount: 320.75, status: 'pendente', date: '2 dias' },
];

const topProducts = [
  { name: 'Vinho Reserva 2018', sales: 45, revenue: 562.50 },
  { name: 'Queijo Serra DOP', sales: 32, revenue: 284.80 },
  { name: 'Cerveja IPA', sales: 28, revenue: 117.60 },
];

const quickActions = [
  {
    id: 'add',
    title: 'Adicionar Produto',
    icon: 'add-circle',
    screen: 'AddProduct',
    color: colors.primary,
  },
  {
    id: 'manage',
    title: 'Gerir Produtos',
    icon: 'list',
    screen: 'ManageProducts',
    color: '#4A90E2',
  },
  {
    id: 'ads',
    title: 'Criar Anúncio',
    icon: 'megaphone',
    screen: 'Ads',
    color: '#F5A623',
  },
  {
    id: 'analytics',
    title: 'Análises',
    icon: 'analytics',
    screen: 'Dashboard',
    color: '#7B68EE',
  },
];

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.profileSection}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop' }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.greeting}>Bom dia!</Text>
                <Text style={styles.companyName}>Quinta do Vale</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={12} color={colors.surface} />
                  <Text style={styles.verifiedText}>Fornecedor Verificado</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color={colors.surface} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Período Selector */}
          <View style={styles.periodSelector}>
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.periodButtonSelected,
                ]}
                onPress={() => setSelectedPeriod(period)}>
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period && styles.periodTextSelected,
                ]}>
                  {period === 'week' ? 'Semana' : 
                   period === 'month' ? 'Mês' : 
                   period === 'quarter' ? 'Trimestre' : 'Ano'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Métricas */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>📊 Métricas de Performance</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#E8F5E8' }]}>
                <Ionicons name="cube" size={24} color={colors.primary} />
              </View>
              <Text style={styles.metricNumber}>{stats.activeProducts}</Text>
              <Text style={styles.metricLabel}>Produtos Ativos</Text>
              <Text style={styles.metricChange}>+2 este mês</Text>
            </View>
            
            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#E8F0F8' }]}>
                <Ionicons name="cart" size={24} color="#4A90E2" />
              </View>
              <Text style={styles.metricNumber}>{stats.sales}</Text>
              <Text style={styles.metricLabel}>Vendas</Text>
              <Text style={styles.metricChange}>↗️ 12% vs mês passado</Text>
            </View>
            
            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#F8F0E8' }]}>
                <Ionicons name="cash" size={24} color="#F5A623" />
              </View>
              <Text style={styles.metricNumber}>€{stats.revenue.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</Text>
              <Text style={styles.metricLabel}>Receita</Text>
              <Text style={styles.metricChange}>↗️ 8% vs mês passado</Text>
            </View>
            
            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#F0E8F8' }]}>
                <Ionicons name="eye" size={24} color="#7B68EE" />
              </View>
              <Text style={styles.metricNumber}>{stats.views.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Visualizações</Text>
              <Text style={styles.metricChange}>↗️ 24% vs mês passado</Text>
            </View>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen as any)}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={28} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pedidos Recentes */}
        <View style={styles.ordersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🛒 Pedidos Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersList}>
            {recentOrders.map((order) => (
              <TouchableOpacity key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderAmount}>€{order.amount.toFixed(2)}</Text>
                  <View style={[
                    styles.orderStatus,
                    { backgroundColor: 
                      order.status === 'entregue' ? '#E8F5E8' : 
                      order.status === 'processando' ? '#FFF8E1' : '#FFEBEE'
                    }
                  ]}>
                    <Text style={[
                      styles.orderStatusText,
                      { color: 
                        order.status === 'entregue' ? colors.success : 
                        order.status === 'processando' ? '#FF9800' : colors.error
                      }
                    ]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Produtos Mais Vendidos */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Produtos em Destaque</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver análise</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsList}>
            {topProducts.map((product, index) => (
              <View key={index} style={styles.productRankingCard}>
                <View style={styles.rankingNumber}>
                  <Text style={styles.rankingText}>{index + 1}</Text>
                </View>
                <View style={styles.productRankingInfo}>
                  <Text style={styles.productRankingName}>{product.name}</Text>
                  <Text style={styles.productRankingSales}>{product.sales} vendas</Text>
                </View>
                <Text style={styles.productRankingRevenue}>€{product.revenue.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Anúncios Premium */}
        <View style={styles.adsSection}>
          <View style={styles.adsCard}>
            <View style={styles.adsHeader}>
              <Ionicons name="rocket" size={32} color={colors.primary} />
              <View style={styles.adsHeaderContent}>
                <Text style={styles.adsTitle}>Aumente Sua Visibilidade</Text>
                <Text style={styles.adsSubtitle}>Apareça para restaurantes e hotéis</Text>
              </View>
            </View>
            <View style={styles.adsFeatures}>
              {[
                'Destaque na Home por 30 dias',
                'Aumento de vendas em até 300%',
                'Analytics detalhados',
                'Suporte prioritário',
              ].map((feature, index) => (
                <View key={index} style={styles.adsFeature}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                  <Text style={styles.adsFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity 
              style={styles.adsButton}
              onPress={() => navigation.navigate('Ads')}>
              <Text style={styles.adsButtonText}>Plano MVP - €20/mês</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>💡 Insights para Crescimento</Text>
          <View style={styles.insightsCard}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <View style={styles.insightsContent}>
              <Text style={styles.insightsTitle}>Recomendação do Sistema</Text>
              <Text style={styles.insightsText}>
                • Adicione fotos profissionais dos seus produtos{'\n'}
                • Ofereça embalagens para foodservice{'\n'}
                • Configure entrega programada{'\n'}
                • Participe de promoções sazonais
              </Text>
            </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.surface,
  },
  profileInfo: {
    marginLeft: 15,
  },
  greeting: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.surface,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: '600',
    marginLeft: 3,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  periodSelector: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  periodButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  periodButtonSelected: {
    backgroundColor: colors.surface,
  },
  periodText: {
    fontSize: 12,
    color: colors.surface,
    fontWeight: '500',
  },
  periodTextSelected: {
    color: colors.primary,
  },
  metricsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    ...shadows.small,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    ...shadows.small,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  ordersSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  ordersList: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    ...shadows.small,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderInfo: {
    flex: 1,
  },
  orderCustomer: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
  },
  orderStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productsList: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    ...shadows.small,
  },
  productRankingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rankingNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankingText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productRankingInfo: {
    flex: 1,
  },
  productRankingName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  productRankingSales: {
    fontSize: 12,
    color: colors.textLight,
  },
  productRankingRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  adsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  adsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.medium,
  },
  adsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  adsHeaderContent: {
    flex: 1,
    marginLeft: 15,
  },
  adsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  adsSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  adsFeatures: {
    marginBottom: 20,
  },
  adsFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  adsFeatureText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
  },
  adsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
  },
  adsButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightsCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    ...shadows.small,
  },
  insightsContent: {
    flex: 1,
    marginLeft: 15,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  insightsText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
});