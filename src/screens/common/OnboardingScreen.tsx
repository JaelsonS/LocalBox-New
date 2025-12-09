import React, { useState, useRef } from 'react';
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

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Configurações responsivas
const getResponsiveValue = (mobile: number, web: number) => 
  isWeb ? web : mobile;

const containerWidth = isWeb ? Math.min(width, 1200) : width;
const columnCount = isWeb ? 4 : 2;
const productCardWidth = (containerWidth - 40 - (15 * (columnCount - 1))) / columnCount;

// Clientes em Destaque (para ads pagos) - Aumentado para 8
const featuredClients = [
  {
    id: '1',
    name: 'Quinta do Vale',
    category: 'Vinhos Premium',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
    description: 'Produtor familiar há 3 gerações, especialista em vinhos tintos',
    isSponsored: true,
  },
  {
    id: '2',
    name: 'Cervejaria Artesanal',
    category: 'Cervejas Especiais',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop',
    description: 'Microcervejaria premiada com mais de 20 rótulos',
    isSponsored: true,
  },
  {
    id: '3',
    name: 'Queijaria Tradicional',
    category: 'Queijos DOP',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=600&fit=crop',
    description: 'Queijos artesanais com Denominação de Origem Protegida',
    isSponsored: true,
  },
  {
    id: '4',
    name: 'Apiário Natural',
    category: 'Mel Orgânico',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&h=600&fit=crop',
    description: 'Mel 100% puro de flores silvestres portuguesas',
    isSponsored: false,
  },
  {
    id: '5',
    name: 'Horta Biológica',
    category: 'Legumes Orgânicos',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    description: 'Produtos agrícolas 100% biológicos sem pesticidas',
    isSponsored: false,
  },
  {
    id: '6',
    name: 'Padaria Rural',
    category: 'Pães Artesanais',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    description: 'Forno a lenha tradicional com farinhas locais',
    isSponsored: false,
  },
  {
    id: '7',
    name: 'Adega Cooperativa',
    category: 'Vinhos Regionais',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop',
    description: 'Cooperativa de pequenos produtores vinícolas',
    isSponsored: true,
  },
  {
    id: '8',
    name: 'Olivais do Sul',
    category: 'Azeites Premium',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop',
    description: 'Azeite extra virgem primeira pressão a frio',
    isSponsored: true,
  },
];

// 20 CATEGORIAS COMPLETAS para foodservice
const productCategories = [
  {
    id: 'wines',
    name: '🍷 Vinhos e Espumantes',
    icon: '🍷',
    products: [
      { id: 'w1', name: 'Vinho Tinto Reserva 2018', producer: 'Quinta do Vale' },
      { id: 'w2', name: 'Vinho Branco Alvarinho', producer: 'Região Vinho Verde' },
      { id: 'w3', name: 'Espumante Brut Tradicional', producer: 'Casa dos Espumantes' },
      { id: 'w4', name: 'Vinho Rosé Regional', producer: 'Adega Cooperativa' },
      { id: 'w5', name: 'Vinho do Porto LBV', producer: 'Caves do Douro' },
    ],
  },
  {
    id: 'beers',
    name: '🍺 Cervejas Artesanais',
    icon: '🍺',
    products: [
      { id: 'b1', name: 'Cerveja IPA Double Hop', producer: 'Cervejaria Art' },
      { id: 'b2', name: 'Cerveja Stout Imperial', producer: 'Dark Brews' },
      { id: 'b3', name: 'Cerveja Weiss Bavária', producer: 'German Style' },
      { id: 'b4', name: 'Cerveja Pilsen Bohemia', producer: 'Traditional Brew' },
      { id: 'b5', name: 'Cerveja APA Citra', producer: 'American Pale Ale' },
    ],
  },
  {
    id: 'cheeses',
    name: '🧀 Queijos e Laticínios',
    icon: '🧀',
    products: [
      { id: 'c1', name: 'Queijo Serra da Estrela DOP', producer: 'Queijaria Trad' },
      { id: 'c2', name: 'Queijo de Cabra Curado', producer: 'Cabra Alentejana' },
      { id: 'c3', name: 'Queijo Flamengo Meia Cura', producer: 'Laticínios Regionais' },
      { id: 'c4', name: 'Requeijão Caseiro', producer: 'Produtos Lácteos Artesanais' },
      { id: 'c5', name: 'Manteiga de Ovelha Salgada', producer: 'Pastorícia Tradicional' },
    ],
  },
  {
    id: 'oils',
    name: '🫒 Azeites e Óleos',
    icon: '🫒',
    products: [
      { id: 'o1', name: 'Azeite Extra Virgem Premium', producer: 'Olivais do Sul' },
      { id: 'o2', name: 'Azeite Arbequina', producer: 'Olivais Alentejanos' },
      { id: 'o3', name: 'Azeite com Ervas Aromáticas', producer: 'Aromas do Campo' },
      { id: 'o4', name: 'Óleo de Noz Artesanal', producer: 'Frutos Secos Premium' },
      { id: 'o5', name: 'Azeite Picual', producer: 'Varietal Português' },
    ],
  },
  {
    id: 'honey',
    name: '🍯 Mel e Compotas',
    icon: '🍯',
    products: [
      { id: 'h1', name: 'Mel de Rosmaninho Puro', producer: 'Apiário Natural' },
      { id: 'h2', name: 'Mel de Flores Silvestres', producer: 'Apiário Montanha' },
      { id: 'h3', name: 'Compota de Figo Artesanal', producer: 'Doçaria Regional' },
      { id: 'h4', name: 'Geleia de Laranja Amarga', producer: 'Confeitarias Tradicionais' },
      { id: 'h5', name: 'Mel de Eucalipto', producer: 'Apiário do Norte' },
    ],
  },
  {
    id: 'meats',
    name: '🥩 Carnes e Enchidos',
    icon: '🥩',
    products: [
      { id: 'm1', name: 'Presunto Pata Negra 36 meses', producer: 'Suínos Alentejanos' },
      { id: 'm2', name: 'Chouriço Artesanal Defumado', producer: 'Talho Tradicional' },
      { id: 'm3', name: 'Salpicão de Vinhais IGP', producer: 'Carnes de Vinhais' },
      { id: 'm4', name: 'Alheira de Caça', producer: 'Enchidos Regionais' },
      { id: 'm5', name: 'Morcela de Arroz', producer: 'Talho Artesanal' },
    ],
  },
  {
    id: 'breads',
    name: '🥖 Pães e Bolos',
    icon: '🥖',
    products: [
      { id: 'p1', name: 'Pão de Centeio Integral', producer: 'Padaria Rural' },
      { id: 'p2', name: 'Bolo de Azeite Regional', producer: 'Confeitaria Local' },
      { id: 'p3', name: 'Broa de Milho Tradicional', producer: 'Forno Tradicional' },
      { id: 'p4', name: 'Pão Alentejano com Sourdough', producer: 'Forno a Lenha' },
      { id: 'p5', name: 'Bolo de Mel Conventual', producer: 'Doçaria Conventual' },
    ],
  },
  {
    id: 'organic',
    name: '🌱 Produtos Orgânicos',
    icon: '🌱',
    products: [
      { id: 'og1', name: 'Legumes Orgânicos da Época', producer: 'Horta Biológica' },
      { id: 'og2', name: 'Frutas Biológicas Sazonais', producer: 'Pomares Naturais' },
      { id: 'og3', name: 'Ervas Aromáticas Frescas', producer: 'Cultivo Natural' },
      { id: 'og4', name: 'Chás e Infusões Orgânicas', producer: 'Plantas Medicinais' },
      { id: 'og5', name: 'Temperos Orgânicos Desidratados', producer: 'Agricultura Biológica' },
    ],
  },
  {
    id: 'seafood',
    name: '🐟 Mariscos e Peixe Fresco',
    icon: '🐟',
    products: [
      { id: 's1', name: 'Sardinha Fresca do Atlântico', producer: 'Pescada Local' },
      { id: 's2', name: 'Amêijoa da Ria de Aveiro', producer: 'Marisqueira Tradicional' },
      { id: 's3', name: 'Berbigão do Estuário do Tejo', producer: 'Mariscadores' },
      { id: 's4', name: 'Polvo da Costa Algarvia', producer: 'Pescadores Costeiros' },
      { id: 's5', name: 'Atum Rabilho Sustentável', producer: 'Pesca Sustentável' },
    ],
  },
  {
    id: 'spices',
    name: '🌶️ Especiarias e Temperos',
    icon: '🌶️',
    products: [
      { id: 'sp1', name: 'Pimentão Doce Moído', producer: 'Produtores do Sul' },
      { id: 'sp2', name: 'Açafrão da Terra', producer: 'Raízes Brasileiras' },
      { id: 'sp3', name: 'Sal Marinho Artesanal', producer: 'Salinas Tradicionais' },
      { id: 'sp4', name: 'Piri-piri Seco', producer: 'Pimentas Regionais' },
      { id: 'sp5', name: 'Cominho em Grão', producer: 'Especiarias do Mundo' },
    ],
  },
  {
    id: 'coffee',
    name: '☕ Café e Chá Especial',
    icon: '☕',
    products: [
      { id: 'cf1', name: 'Café Arábica Torra Média', producer: 'Torrefação Artesanal' },
      { id: 'cf2', name: 'Chá Verde de Java', producer: 'Importadores Especiais' },
      { id: 'cf3', name: 'Café Robusta para Expresso', producer: 'Torrefação Tradicional' },
      { id: 'cf4', name: 'Chá Preto Darjeeling', producer: 'Chás Premiados' },
      { id: 'cf5', name: 'Café Descafeinado Natural', producer: 'Processamento Especial' },
    ],
  },
  {
    id: 'chocolate',
    name: '🍫 Chocolate e Doces Finos',
    icon: '🍫',
    products: [
      { id: 'ch1', name: 'Chocolate Negro 70% Cacau', producer: 'Chocolatier Artesanal' },
      { id: 'ch2', name: 'Trufas de Chocolate Belga', producer: 'Confeitaria Fina' },
      { id: 'ch3', name: 'Chocolate de Laranja Amarga', producer: 'Doces Regionais' },
      { id: 'ch4', name: 'Bombons Recheados', producer: 'Confeiteiros Especializados' },
      { id: 'ch5', name: 'Tablete de Chocolate com Amêndoa', producer: 'Chocolate Premium' },
    ],
  },
  {
    id: 'pasta',
    name: '🍝 Massas e Arroz Especiais',
    icon: '🍝',
    products: [
      { id: 'pa1', name: 'Massa Fresca de Ovo', producer: 'Pastificio Artigianale' },
      { id: 'pa2', name: 'Arroz Carolino do Baixo Mondego', producer: 'Arrozais Portugueses' },
      { id: 'pa3', name: 'Massa Integral de Espelta', producer: 'Produtos Integrais' },
      { id: 'pa4', name: 'Risotto de Cogumelos Selvagens', producer: 'Misturas Premium' },
      { id: 'pa5', name: 'Massa sem Glúten de Milho', producer: 'Alternativas Sem Glúten' },
    ],
  },
  {
    id: 'vinegars',
    name: '🍶 Vinagres e Molhos',
    icon: '🍶',
    products: [
      { id: 'v1', name: 'Vinagre Balsâmico Modena', producer: 'Acetaias Italianas' },
      { id: 'v2', name: 'Vinagre de Vinho Tinto', producer: 'Adega Experimental' },
      { id: 'v3', name: 'Molho de Soja Tradicional', producer: 'Produtos Asiáticos' },
      { id: 'v4', name: 'Vinagre de Sidra de Maçã', producer: 'Produtores de Sidra' },
      { id: 'v5', name: 'Molho Piri-piri Artesanal', producer: 'Condimentos Regionais' },
    ],
  },
  {
    id: 'nuts',
    name: '🥜 Frutos Secos e Sementes',
    icon: '🥜',
    products: [
      { id: 'n1', name: 'Amêndoa Algarvia Torrada', producer: 'Frutos Secos do Algarve' },
      { id: 'n2', name: 'Noz Pelada Extra', producer: 'Produtores da Beira Alta' },
      { id: 'n3', name: 'Pistácio Irâniano Grau A', producer: 'Importação Premium' },
      { id: 'n4', name: 'Semente de Abóbora Salgada', producer: 'Produtos Naturais' },
      { id: 'n5', name: 'Castanha do Marão', producer: 'Castanheiros Tradicionais' },
    ],
  },
  {
    id: 'herbs',
    name: '🌿 Ervas e Flores Comestíveis',
    icon: '🌿',
    products: [
      { id: 'e1', name: 'Manjericão Fresco', producer: 'Hidroponia Local' },
      { id: 'e2', name: 'Coentros Frescos', producer: 'Agricultura de Proximidade' },
      { id: 'e3', name: 'Flores Comestíveis Mistas', producer: 'Cultivo Especializado' },
      { id: 'e4', name: 'Hortelã-pimenta Orgânica', producer: 'Plantação Biológica' },
      { id: 'e5', name: 'Alecrim em Ramo', producer: 'Ervas Aromáticas Frescas' },
    ],
  },
  {
    id: 'water',
    name: '💧 Águas e Refrigerantes',
    icon: '💧',
    products: [
      { id: 'wa1', name: 'Água Mineral com Gás', producer: 'Fontes Naturais' },
      { id: 'wa2', name: 'Água Alcalina Ionizada', producer: 'Tratamento Especial' },
      { id: 'wa3', name: 'Sumo de Laranja Natural', producer: 'Citricultores Regionais' },
      { id: 'wa4', name: 'Refrigerante Artesanal de Gengibre', producer: 'Produção Limitada' },
      { id: 'wa5', name: 'Água da Torneira Filtrada', producer: 'Sistemas de Filtração' },
    ],
  },
  {
    id: 'frozen',
    name: '❄️ Produtos Congelados Premium',
    icon: '❄️',
    products: [
      { id: 'f1', name: 'Frutos Vermelhos Congelados', producer: 'Produtores do Oeste' },
      { id: 'f2', name: 'Espinafres Baby Congelados', producer: 'Hortofrutícola Moderna' },
      { id: 'f3', name: 'Camarão Tigre Congelado', producer: 'Importação Direta' },
      { id: 'f4', name: 'Massa Fresca Congelada', producer: 'Congelados Premium' },
      { id: 'f5', name: 'Legumes para Wok Congelados', producer: 'Cortes Especiais' },
    ],
  },
  {
    id: 'dairy',
    name: '🥛 Laticínios Alternativos',
    icon: '🥛',
    products: [
      { id: 'd1', name: 'Leite de Amêndoa Artesanal', producer: 'Bebidas Vegetais' },
      { id: 'd2', name: 'Iogurte de Coco Natural', producer: 'Alternativas Veganas' },
      { id: 'd3', name: 'Queijo Vegano de Castanha', producer: 'Produtos Plant-Based' },
      { id: 'd4', name: 'Manteiga de Amendoim Natural', producer: 'Cremes de Frutos Secos' },
      { id: 'd5', name: 'Leite de Aveia Barista', producer: 'Bebidas para Café' },
    ],
  },
  {
    id: 'desserts',
    name: '🍰 Sobremesas e Docaria Fina',
    icon: '🍰',
    products: [
      { id: 'ds1', name: 'Pastel de Nata Artesanal', producer: 'Pastelaria Tradicional' },
      { id: 'ds2', name: 'Mousse de Chocolate Belga', producer: 'Sobremesas Premium' },
      { id: 'ds3', name: 'Cheesecake de Frutos Vermelhos', producer: 'Confeitaria Fina' },
      { id: 'ds4', name: 'Tiramisù Clássico', producer: 'Doce Italiano Autêntico' },
      { id: 'ds5', name: 'Crème Brûlée de Baunilha', producer: 'Sobremesas Clássicas' },
    ],
  },
];
type OnboardingScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(4); // Começa com 4, você pode aumentar

  const renderProductCategory = (category: typeof productCategories[0]) => (
    <View key={category.id} style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
      
      <View style={styles.productsList}>
        {category.products.slice(0, 3).map((product) => (
          <TouchableOpacity 
            key={product.id}
            style={styles.productItem}
            onPress={() => navigation.navigate('Login')}>
            <View style={styles.productInfo}>
              <Text style={styles.productItemName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productItemProducer} numberOfLines={1}>
                {product.producer}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.quickViewButton}
              onPress={() => navigation.navigate('Login')}>
              <Ionicons name="eye" size={14} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.viewAllButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.viewAllText}>Ver todos {category.products.length} produtos</Text>
        <Ionicons name="arrow-forward" size={14} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={getResponsiveValue(32, 40)} color={colors.primary} />
          <Text style={styles.logoText}>LocalBox</Text>
        </View>
        <Text style={styles.tagline}>Marketplace de Produtores Locais para Foodservice</Text>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}>
        
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
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.heroButtonText}>Começar Agora</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
          {isWeb && (
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop' }}
              style={styles.heroImage}
            />
          )}
        </View>

        {/* Clientes em Destaque */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Produtores em Destaque</Text>
            <View style={styles.sponsoredLabel}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.sponsoredText}>Espaço Premium</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle}>
            Produtores que escolheram maior visibilidade na plataforma
          </Text>
          
          <ScrollView 
            horizontal={!isWeb}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={isWeb ? styles.featuredGrid : styles.featuredScroll}>
            {featuredClients.map((client) => (
              <View key={client.id} style={styles.featuredCard}>
                <Image source={{ uri: client.image }} style={styles.featuredImage} />
                <View style={styles.featuredContent}>
                  {client.isSponsored && (
                    <View style={styles.premiumBadge}>
                      <Ionicons name="flash" size={12} color={colors.surface} />
                      <Text style={styles.premiumText}>PREMIUM</Text>
                    </View>
                  )}
                  <Text style={styles.featuredName}>{client.name}</Text>
                  <Text style={styles.featuredCategory}>{client.category}</Text>
                  <Text style={styles.featuredDescription}>{client.description}</Text>
                  <TouchableOpacity 
                    style={styles.featuredButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.featuredButtonText}>Ver Catálogo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.adsCta}>
            <Ionicons name="megaphone" size={20} color={colors.primary} />
            <View style={styles.adsCtaContent}>
              <Text style={styles.adsCtaTitle}>Quer ser destaque aqui?</Text>
              <Text style={styles.adsCtaText}>
                Aumente suas vendas com nosso plano de visibilidade premium
              </Text>
            </View>
            <TouchableOpacity style={styles.adsCtaButton}>
              <Text style={styles.adsCtaButtonText}>Saber mais</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Categorias de Produtos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📦 Nossas Categorias</Text>
            <Text style={styles.productCount}>40+ produtos disponíveis</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Explore nossa variedade de produtos locais de alta qualidade
          </Text>
          
          <View style={styles.categoriesGrid}>
            {productCategories.slice(0, visibleCategories).map(renderProductCategory)}
          </View>
          
          {visibleCategories < productCategories.length && (
            <TouchableOpacity 
              style={styles.loadMoreButton}
              onPress={() => setVisibleCategories(prev => prev + 4)}>
              <Text style={styles.loadMoreText}>Carregar mais categorias</Text>
              <Ionicons name="chevron-down" size={16} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Por que escolher */}
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

        {/* Espaço para Expansão Futura 
        <View style={styles.expansionSection}>
          <View style={styles.expansionHeader}>
            <Ionicons name="add-circle" size={32} color={colors.primary} />
            <Text style={styles.expansionTitle}>Espaço para Expansão</Text>
          </View>
          <Text style={styles.expansionText}>
            Esta seção foi criada para você adicionar novos produtos, categorias 
            ou informações conforme sua plataforma crescer. Basta editar o array 
            de produtos acima para adicionar mais conteúdo.
          </Text>
          
          <View style={styles.expansionGrid}>
            <TouchableOpacity style={styles.addCard}>
              <Ionicons name="add" size={24} color={colors.primary} />
              <Text style={styles.addCardText}>Adicionar Nova Categoria</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addCard}>
              <Ionicons name="image" size={24} color={colors.primary} />
              <Text style={styles.addCardText}>Adicionar Mais Produtos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addCard}>
              <Ionicons name="megaphone" size={24} color={colors.primary} />
              <Text style={styles.addCardText}>Adicionar Anúncios</Text>
            </TouchableOpacity>
          </View>
        </View>
        */}

        {/* Espaço final */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Fixo */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.primaryButtonText}>
            {isWeb ? 'Cadastre-se Gratuitamente' : 'Começar Agora'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.surface} />
        </TouchableOpacity>
        
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Já tem conta? Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Para Fornecedores</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Para Restaurantes</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 30,
    paddingVertical: getResponsiveValue(15, 18),
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: colors.primary,
    fontSize: getResponsiveValue(16, 18),
    fontWeight: 'bold',
    marginRight: 10,
  },
  heroImage: {
    width: isWeb ? 400 : '100%',
    height: isWeb ? 250 : 200,
    borderRadius: 15,
  },
  section: {
    paddingHorizontal: getResponsiveValue(20, 40),
    marginBottom: 50,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: getResponsiveValue(20, 28),
    fontWeight: 'bold',
    color: colors.text,
  },
  sponsoredLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  sponsoredText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    marginLeft: 5,
  },
  sectionSubtitle: {
    fontSize: getResponsiveValue(13, 15),
    color: colors.textLight,
    marginBottom: 25,
  },
  productCount: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  featuredScroll: {
    paddingRight: 20,
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredCard: {
    width: isWeb ? (containerWidth / 3) - 30 : 280,
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    marginRight: isWeb ? 0 : 15,
    ...shadows.medium,
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: 20,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  premiumText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  featuredCategory: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 10,
  },
  featuredDescription: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 18,
  },
  featuredButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  featuredButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  adsCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7EC',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  adsCtaContent: {
    flex: 1,
    marginLeft: 15,
  },
  adsCtaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  adsCtaText: {
    fontSize: 13,
    color: colors.primaryDark,
  },
  adsCtaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  adsCtaButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: isWeb ? (containerWidth / 2) - 25 : '100%',
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...shadows.small,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  productsList: {
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productInfo: {
    flex: 1,
  },
  productItemName: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 3,
  },
  productItemProducer: {
    fontSize: 12,
    color: colors.textLight,
  },
  quickViewButton: {
    padding: 6,
    backgroundColor: '#F0F7EC',
    borderRadius: 6,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  viewAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 6,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginTop: 10,
    ...shadows.small,
  },
  loadMoreText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 8,
  },
  benefitsSection: {
    paddingHorizontal: getResponsiveValue(20, 40),
    marginBottom: 50,
  },
  benefitsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: isWeb ? (containerWidth / 4) - 30 : '100%',
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
  expansionSection: {
    paddingHorizontal: getResponsiveValue(20, 40),
    marginBottom: 50,
  },
  expansionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  expansionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 12,
  },
  expansionText: {
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: 25,
  },
  expansionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  addCard: {
    width: isWeb ? (containerWidth / 3) - 30 : '100%',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: getResponsiveValue(20, 40),
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    ...shadows.large,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: getResponsiveValue(16, 20),
    marginBottom: 15,
    ...shadows.medium,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: getResponsiveValue(16, 18),
    fontWeight: 'bold',
    marginRight: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  footerSeparator: {
    fontSize: 13,
    color: colors.textLight,
  },
});