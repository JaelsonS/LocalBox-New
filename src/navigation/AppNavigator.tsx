import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Telas comuns
import SplashScreen from '../screens/common/SplashScreen';
import OnboardingScreen from '../screens/common/OnboardingScreen';
import LoginScreen from '../screens/common/LoginScreen';
import RegisterTypeScreen from '../screens/common/RegisterTypeScreen';

// Telas do CLIENTE
import HomeScreen from '../screens/user/HomeScreen';
import SuppliersScreen from '../screens/user/SuppliersScreen';
import ProductScreen from '../screens/user/ProductScreen';
import CartScreen from '../screens/user/CartScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

// Telas do FORNECEDOR
import DashboardScreen from '../screens/supplier/DashboardScreen';
import SupplierProductsScreen from '../screens/supplier/ProductsScreen';
import SupplierOrdersScreen from '../screens/supplier/OrdersScreen';
import SupplierAnalyticsScreen from '../screens/supplier/AnalyticsScreen';
import AddProductScreen from '../screens/supplier/AddProductScreen';
import CampaignsScreen from '../screens/supplier/CampaignsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SupplierTab = createBottomTabNavigator();

// ========== FLUXO DO CLIENTE ==========

// Bottom Tabs do Cliente
function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Suppliers') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Início' }} 
      />
      <Tab.Screen 
        name="Suppliers" 
        component={SuppliersScreen} 
        options={{ title: 'Fornecedores' }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ title: 'Carrinho' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}

// Stack do Cliente
function CustomerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E40AF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen 
        name="CustomerTabs" 
        component={CustomerTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductScreen}
        options={{ title: 'Detalhes do Produto' }}
      />
    </Stack.Navigator>
  );
}

// ========== FLUXO DO FORNECEDOR ==========

// Bottom Tabs do Fornecedor
function SupplierTabs() {
  return (
    <SupplierTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'grid';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: 'Dashboard' }} 
      />
      <Tab.Screen 
        name="Products" 
        component={SupplierProductsScreen} 
        options={{ title: 'Produtos' }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={SupplierOrdersScreen} 
        options={{ title: 'Pedidos' }} 
      />
      <Tab.Screen 
        name="Analytics" 
        component={SupplierAnalyticsScreen} 
        options={{ title: 'Estatísticas' }} 
      />
    </SupplierTab.Navigator>
  );
}

// Stack do Fornecedor
function SupplierStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E40AF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen 
        name="SupplierMain" 
        component={SupplierTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddProduct" 
        component={AddProductScreen}
        options={{ title: 'Adicionar Produto' }}
      />
      <Stack.Screen 
        name="Campaigns" 
        component={CampaignsScreen}
        options={{ title: 'Campanhas de Preço' }}
      />
    </Stack.Navigator>
  );
}

// ========== NAVEGAÇÃO PRINCIPAL ==========

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'customer' | 'supplier' | null>(null);

  useEffect(() => {
    // Simular carregamento inicial
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Verificar se usuário já está logado no AsyncStorage
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen navigation={undefined as any} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Usuário NÃO logado
          <>
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen} 
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
            />
            <Stack.Screen 
              name="RegisterType" 
              component={RegisterTypeScreen}
              options={{ 
                headerShown: true,
                title: 'Tipo de Cadastro',
                headerStyle: { backgroundColor: '#1E40AF' },
                headerTintColor: '#FFFFFF',
              }}
            />
          </>
        ) : (
          // Usuário LOGADO - redirecionar conforme tipo
          userType === 'customer' ? (
            <Stack.Screen name="Customer" component={CustomerStack} />
          ) : (
            <Stack.Screen name="Supplier" component={SupplierStack} />
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}