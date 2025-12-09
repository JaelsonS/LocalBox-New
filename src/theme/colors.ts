// src/theme/colors.ts
// Exporta tanto um default quanto named exports para compatibilidade
// com importações existentes em vários componentes.

export const colors = {
  // Cores principais
  primary: '#1E40AF',      // Azul escuro principal
  primaryLight: '#3B82F6', // Azul médio
  primaryLighter: '#60A5FA', // Azul claro
  // variação escura para contrastes
  primaryDark: '#0F2A66',

  // Cores secundárias
  secondary: '#10B981',    // Verde (sucesso)
  accent: '#8B5CF6',       // Roxo (destaque)
  secondaryLight: '#34D399',
  secondaryDark: '#0B8B55',

  // Neutros
  background: '#F8FAFC',   // Fundo claro
  surface: '#FFFFFF',      // Superfícies/cards
  text: '#1F2937',         // Texto escuro
  textSecondary: '#6B7280', // Texto secundário
  // alias usado em alguns componentes
  textLight: '#6B7280',
  textLighter: '#9CA3AF',

  // Estados
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Gradientes usados em alguns lugares
  gradient: ['#1E40AF', '#3B82F6'],
  gradientDark: ['#0F2A66', '#1E40AF'],

  // Bordas e divisores
  border: '#E5E7EB',
  divider: '#F3F4F6',
};

// Sombreamentos simples usados em estilos (plataforma iOS/Android)
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Default export para compatibilidade com import default em alguns lugares
export default colors;