import type { Product } from '../types/Product';

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', supplierId: '1', name: 'Azeite Extra Virgem 500ml', description: 'Azeite premium primeira pressão', price: 12.5, unit: 'un' },
  { id: 'p2', supplierId: '1', name: 'Conserva de Azeitonas 200g', description: 'Azeitonas marinadas', price: 4.2, unit: 'un' },
  { id: 'p3', supplierId: '2', name: 'Vinho Tinto Reserva 2018 750ml', description: 'Notas de frutos vermelhos', price: 18.0, unit: 'un' },
  { id: 'p4', supplierId: '3', name: 'Cerveja IPA 500ml', description: 'Cerveja artesanal lupulada', price: 3.5, unit: 'un' },
  { id: 'p5', supplierId: '4', name: 'Queijo Curado 1kg', description: 'Queijo curado tradicional', price: 22.0, unit: 'kg' },
];
