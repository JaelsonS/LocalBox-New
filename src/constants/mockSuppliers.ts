import type { Supplier } from '../types/Supplier';

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: '1', name: 'Oliveira do Lis', category: 'Alimentos', rating: 4.8, products: 24, deliveryTime: '1-2 dias', location: 'Leiria Centro', description: 'Produtores de azeite e conservas' },
  { id: '2', name: 'Quinta do Vale', category: 'Bebidas', rating: 4.7, products: 12, deliveryTime: '2-3 dias', location: 'Pombal', description: 'Vinhos artesanais' },
  { id: '3', name: 'Cervejaria Artesanal', category: 'Bebidas', rating: 4.6, products: 8, deliveryTime: '1-2 dias', location: 'Leiria', description: 'Cervejas especiais' },
  { id: '4', name: 'Queijaria Tradicional', category: 'Alimentos', rating: 4.9, products: 15, deliveryTime: '1-2 dias', location: 'Batalha', description: 'Queijos artesanais' },
  { id: '5', name: 'Apiário Natural', category: 'Alimentos', rating: 4.5, products: 6, deliveryTime: '2 dias', location: 'Marinha Grande', description: 'Mel orgânico' },
  { id: '6', name: 'Horta Biológica', category: 'Alimentos', rating: 4.4, products: 20, deliveryTime: '1-2 dias', location: 'Leiria', description: 'Legumes e verduras' },
  { id: '7', name: 'Padaria Rural', category: 'Alimentos', rating: 4.3, products: 10, deliveryTime: '1 dia', location: 'Ansião', description: 'Pães artesanais' },
  { id: '8', name: 'Adega Cooperativa', category: 'Bebidas', rating: 4.2, products: 30, deliveryTime: '3 dias', location: 'Tomar', description: 'Vinhos regionais' },
  { id: '9', name: 'Olivais do Sul', category: 'Alimentos', rating: 4.6, products: 18, deliveryTime: '2 dias', location: 'Leiria Sul', description: 'Azeites premium' },
  { id: '10', name: 'Confeitaria Fina', category: 'Alimentos', rating: 4.7, products: 14, deliveryTime: '1-2 dias', location: 'Figueira da Foz', description: 'Doces e bolos tradicionais' },
];
