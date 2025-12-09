import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Telas comuns
import OnboardingScreen from '../screens/common/OnboardingScreen';
import SplashScreen from '../screens/common/SplashScreen';
import LoginScreen from '../screens/common/LoginScreen';

// Telas do usuário
import HomeScreen from '../screens/user/HomeScreen';
import SuppliersScreen from '../screens/user/SuppliersScreen';

// Telas do fornecedor
import DashboardScreen from '../screens/supplier/DashboardScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para Usuário
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Suppliers') iconName = focused ? 'storefront' : 'storefront-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5A7D45',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Suppliers" component={SuppliersScreen} options={{ title: 'Fornecedores' }} />
      <Tab.Screen name="Cart" component={HomeScreen} options={{ title: 'Carrinho' }} />
      <Tab.Screen name="Profile" component={HomeScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

// Stack para Usuário
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserTabs" component={UserTabs} />
    </Stack.Navigator>
  );
}

// Stack para Fornecedor
function SupplierStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5A7D45',
        },
        headerTintColor: '#F5F3E8',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
    </Stack.Navigator>
  );
}

// Navegador Principal
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserStack" component={UserStack} />
      <Stack.Screen name="SupplierStack" component={SupplierStack} />
    </Stack.Navigator>
  );
}