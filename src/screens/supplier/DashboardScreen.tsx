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

type DashboardScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5A7D45" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Fornecedor!</Text>
            <Text style={styles.companyName}>Quinta do Vale 🍇</Text>
            <Text style={styles.companyType}>Fornecedor Verificado ✓</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>🏭</Text>
          </TouchableOpacity>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>📊 Seu Dashboard</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Produtos Ativos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Vendas</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2.3k</Text>
              <Text style={styles.statLabel}>Visualizações</Text>
            </View>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {[
              { emoji: '➕', title: 'Adicionar Produto' },
              { emoji: '📋', title: 'Gerir Produtos' },
              { emoji: '📢', title: 'Criar Anúncio' },
              { emoji: '📈', title: 'Ver Desempenho' },
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <Text style={styles.actionEmoji}>{action.emoji}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Anúncios */}
        <View style={styles.adsSection}>
          <Text style={styles.sectionTitle}>🚀 Destaque Seus Produtos</Text>
          <View style={styles.adsCard}>
            <Text style={styles.adsTitle}>Plano MVP - €20/mês</Text>
            <Text style={styles.adsDescription}>
              Seu banner na Home do LocalBox por 30 dias
            </Text>
            <TouchableOpacity style={styles.adsButton}>
              <Text style={styles.adsButtonText}>Ativar Destaque</Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#5A7D45',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#F5F3E8',
    opacity: 0.9,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5F3E8',
    marginTop: 5,
  },
  companyType: {
    fontSize: 14,
    color: '#F5F3E8',
    opacity: 0.8,
    marginTop: 2,
  },
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    fontSize: 32,
  },
  statsSection: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B1B1B',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A7D45',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B1B1B',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionEmoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    textAlign: 'center',
  },
  adsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  adsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#5A7D45',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  adsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B1B1B',
    marginBottom: 5,
  },
  adsDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  adsButton: {
    backgroundColor: '#5A7D45',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  adsButtonText: {
    color: '#F5F3E8',
    fontWeight: '600',
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