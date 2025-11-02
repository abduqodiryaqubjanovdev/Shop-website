import React, { useState, useMemo } from 'react';
import { NavBar } from '@/components/NavBar';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { AdminLoginModal } from '@/components/AdminLoginModal';
import { useApp } from '@/context/AppContext';
import { t } from '@/i18n/translations';
import { mockProducts } from '@/data/mockProducts';
import { Plus } from 'lucide-react';

export default function Home() {
  const { language, isAdmin } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'phone' | 'laptop'>('all');
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = mockProducts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar onSearch={setSearchQuery} onAdminClick={() => setAdminLoginOpen(true)} />

      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {t('allProducts', language)}
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                <Plus size={20} />
                {t('addProduct', language)}
              </button>
            )}
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { value: 'all' as const, label: t('allProducts', language) },
              { value: 'phone' as const, label: t('phones', language) },
              { value: 'laptop' as const, label: t('laptops', language) },
            ].map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {showAddProduct && isAdmin && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                {t('addProduct', language)}
              </h2>
              <p className="text-muted-foreground">
                Admin product management will be available when Supabase is connected.
              </p>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
      />
    </div>
  );
}
