import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { t } from '@/i18n/translations';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favorites, toggleFavorite, addToCart, language } = useApp();
  const isFavorite = favorites.has(product.id);

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <button
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 hover:bg-white text-foreground'
          }`}
          title={isFavorite ? t('removeFromFavorites', language) : t('addToFavorites', language)}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          {t('addToCart', language)}
        </button>
      </div>
    </div>
  );
};
