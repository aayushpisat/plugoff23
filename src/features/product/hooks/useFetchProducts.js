import { useState, useEffect, useMemo } from 'react';
import { ENDPOINTS } from '../../../core/api/endpoints.js';
import { apiClient } from '../../../core/api/client.js';

// Realistic product catalogue data
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'QuantumEdge Enterprise Gateway Router',
    description: '10Gbps edge routing appliance with built-in hardware cryptographic acceleration.',
    price: 299,
    category: 'Hardware',
    sku: 'QEG-900',
    stock: 14,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    badge: 'Popular',
  },
  {
    id: 'prod-2',
    title: 'FIDO2 / WebAuthn Hardware Security Key',
    description: 'NFC & USB-C multi-protocol authenticator designed to eliminate credential stuffing vulnerabilities.',
    price: 65,
    category: 'Security',
    sku: 'FIDO-SEC-X',
    stock: 82,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    badge: 'Zero-Trust',
  },
  {
    id: 'prod-3',
    title: 'AeroCore Edge Developer Workstation',
    description: 'Fanless ARM64 local dev node tailored for testing Cloudflare Workers and WASM binaries locally.',
    price: 849,
    category: 'Hardware',
    sku: 'DEV-NODE-8',
    stock: 6,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
    badge: 'Low Stock',
  },
  {
    id: 'prod-4',
    title: 'Sliding-Window Edge Rate Limiter Appliance',
    description: 'Dedicated rackmount network filter supporting up to 1,000,000 req/sec token bucket tracking.',
    price: 1250,
    category: 'Security',
    sku: 'RL-PRO-1M',
    stock: 9,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    badge: 'Enterprise',
  },
  {
    id: 'prod-5',
    title: 'Encrypted NVMe Secure Storage Vault',
    description: 'FIPS 140-2 Level 3 validated solid-state drive with automatic crypto-shred trigger on physical tamper.',
    price: 219,
    category: 'Storage',
    sku: 'NVME-VAULT-2T',
    stock: 35,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
    badge: null,
  },
  {
    id: 'prod-6',
    title: 'Isolated Network Tap & Packet Probe',
    description: 'Zero-delay passive fiber tap for inline intrusion detection and real-time network traffic audits.',
    price: 340,
    category: 'Security',
    sku: 'TAP-100-PROBE',
    stock: 18,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    badge: null,
  },
];

export const useFetchProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return ['All', 'Hardware', 'Security', 'Storage'];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };
};

export default useFetchProducts;
