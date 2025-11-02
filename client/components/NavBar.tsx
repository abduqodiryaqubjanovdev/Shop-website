import React, { useState } from 'react';
import { Search, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/i18n/translations';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  onSearch: (query: string) => void;
  onAdminClick: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onSearch, onAdminClick }) => {
  const { language, isAdmin, setIsAdmin } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-card border-b border-border shadow-sm">
      <div className="px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-primary">TechHub</h1>
          </div>

          <div className="flex-1 max-w-md hidden sm:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('search', language)}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-semibold"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">{t('logout', language)}</span>
              </button>
            ) : (
              <button
                onClick={onAdminClick}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                {t('admin', language)}
              </button>
            )}
          </div>
        </div>

        <div className="sm:hidden mt-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('search', language)}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};
