import React from 'react';
import { Home, Heart, ShoppingCart, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { t } from '@/i18n/translations';

export const BottomNav: React.FC = () => {
  const { language, cart } = useApp();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home', language), icon: Home },
    { path: '/favorites', label: t('favorites', language), icon: Heart },
    { path: '/cart', label: t('cart', language), icon: ShoppingCart },
    { path: '/settings', label: t('settings', language), icon: Settings },
  ];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-3 px-2 flex-1 transition-colors relative ${
                isActive
                  ? 'text-primary border-t-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {item.path === '/cart' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
