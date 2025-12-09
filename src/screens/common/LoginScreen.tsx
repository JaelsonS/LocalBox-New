import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, shadows } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [accountType, setAccountType] = useState<'user' | 'supplier' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSubmit = () => {
    if (!accountType) {
      Alert.alert('Atenção', 'Por favor, selecione um tipo de conta');
      return;
    }

    if (!email) {
      Alert.alert('Atenção', 'Por favor, informe seu e-mail');
      return;
    }

    setIsLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      setIsLoading(false);
      
      if (accountType === 'user') {
        navigation.replace('UserStack');
      } else {
        navigation.replace('SupplierStack');
      }
    }, 1000);
  };

  const handleSkipToBrowse = () => {
    Alert.alert(
      'Modo de Navegação',
      'Você pode navegar pelos produtos, mas para comprar precisa criar uma conta.',
      [
        { text: 'Continuar navegando', onPress: () => navigation.replace('UserStack') },
        { text: 'Criar conta agora', onPress: () => setShowLoginForm(true) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Header com Logo */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="leaf" size={32} color={colors.primary} />
              </View>
              <Text style={styles.logoText}>LocalBox</Text>
              <Text style={styles.tagline}>Conectando produtores e foodservice</Text>
            </View>
          </View>

          {!showLoginForm ? (
            /* Tela de Boas-vindas */
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeCard}>
                <Ionicons name="restaurant" size={64} color={colors.primary} />
                <Text style={styles.welcomeTitle}>Bem-vindo ao LocalBox!</Text>
                <Text style={styles.welcomeText}>
                  Plataforma exclusiva para conectar produtores locais com 
                  restaurantes, hotéis e estabelecimentos do setor foodservice.
                </Text>
                
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => setShowLoginForm(true)}>
                  <Text style={styles.primaryButtonText}>Criar Conta</Text>
                  <Ionicons name="arrow-forward" size={20} color={colors.surface} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={handleSkipToBrowse}>
                  <Text style={styles.secondaryButtonText}>Navegar sem conta</Text>
                </TouchableOpacity>
                
                <View style={styles.loginPrompt}>
                  <Text style={styles.loginPromptText}>Já tem uma conta?</Text>
                  <TouchableOpacity onPress={() => setShowLoginForm(true)}>
                    <Text style={styles.loginLink}>Entrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Benefícios Rápidos */}
              <View style={styles.benefitsGrid}>
                {[
                  { icon: '🏭', title: 'Fornecedores', text: 'Venda para foodservice' },
                  { icon: '🏪', title: 'Restaurantes', text: 'Compre produtos premium' },
                  { icon: '🚚', title: 'Entrega', text: 'Logística dedicada' },
                  { icon: '📊', title: 'Gestão', text: 'Controle total de pedidos' },
                ].map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <Text style={styles.benefitText}>{benefit.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            /* Formulário de Cadastro */
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Criar Conta</Text>
              <Text style={styles.formSubtitle}>Complete seus dados para começar</Text>
              
              <View style={styles.inputGroup}>
                <Ionicons name="person" size={20} color={colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo ou empresa"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={colors.textLighter}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Ionicons name="mail" size={20} color={colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail corporativo"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={colors.textLighter}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Ionicons name="location" size={20} color={colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Cidade/Estado"
                  value={location}
                  onChangeText={setLocation}
                  placeholderTextColor={colors.textLighter}
                />
              </View>

              {/* Tipo de Conta */}
              <Text style={styles.sectionLabel}>Eu sou um:</Text>
              
              <View style={styles.accountTypeGrid}>
                <TouchableOpacity
                  style={[
                    styles.accountTypeCard,
                    accountType === 'user' && styles.accountTypeCardSelected,
                  ]}
                  onPress={() => setAccountType('user')}>
                  <Ionicons 
                    name="restaurant" 
                    size={28} 
                    color={accountType === 'user' ? colors.surface : colors.primary} 
                  />
                  <Text style={[
                    styles.accountTypeTitle,
                    accountType === 'user' && styles.accountTypeTitleSelected,
                  ]}>
                    Restaurante/Hotel
                  </Text>
                  <Text style={styles.accountTypeDesc}>
                    Comprar produtos
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.accountTypeCard,
                    accountType === 'supplier' && styles.accountTypeCardSelected,
                  ]}
                  onPress={() => setAccountType('supplier')}>
                  <Ionicons 
                    name="business" 
                    size={28} 
                    color={accountType === 'supplier' ? colors.surface : colors.primary} 
                  />
                  <Text style={[
                    styles.accountTypeTitle,
                    accountType === 'supplier' && styles.accountTypeTitleSelected,
                  ]}>
                    Fornecedor
                  </Text>
                  <Text style={styles.accountTypeDesc}>
                    Vender produtos
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Botão de Continuar */}
              <TouchableOpacity 
                style={[
                  styles.primaryButton,
                  (!accountType || isLoading) && styles.primaryButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!accountType || isLoading}>
                {isLoading ? (
                  <Text style={styles.primaryButtonText}>Processando...</Text>
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>Continuar</Text>
                    <Ionicons name="arrow-forward" size={20} color={colors.surface} />
                  </>
                )}
              </TouchableOpacity>

              {/* Voltar */}
              <TouchableOpacity 
                style={styles.backLink}
                onPress={() => setShowLoginForm(false)}>
                <Ionicons name="arrow-back" size={16} color={colors.primary} />
                <Text style={styles.backLinkText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 20,
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    ...shadows.medium,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  welcomeContainer: {
    paddingHorizontal: 20,
  },
  welcomeCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
    ...shadows.medium,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    ...shadows.small,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: colors.text,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
    marginTop: 10,
  },
  accountTypeGrid: {
    marginBottom: 25,
  },
  accountTypeCard: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    ...shadows.small,
  },
  accountTypeCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  accountTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  accountTypeTitleSelected: {
    color: colors.surface,
  },
  accountTypeDesc: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    marginBottom: 20,
    ...shadows.small,
  },
  primaryButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginPromptText: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 5,
  },
  loginLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    width: width / 2 - 25,
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    ...shadows.small,
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 16,
  },
});