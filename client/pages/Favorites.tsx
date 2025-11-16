import React, { useMemo } from "react";
import { NavBar } from "@/components/NavBar";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useApp } from "@/context/AppContext";
import { t } from "@/i18n/translations";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { language, favorites, products } = useApp();

  const favoriteProducts = useMemo(
    () => products.filter((p) => favorites.has(p.id)),
    [products, favorites]
  );

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar onSearch={() => {}} onAdminClick={() => {}} />

      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart size={32} className="text-red-500" fill="currentColor" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t("favorites", language)}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {favoriteProducts.length} items in your favorites
            </p>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Heart
                size={48}
                className="mx-auto text-muted-foreground mb-4 opacity-50"
              />
              <p className="text-lg text-muted-foreground mb-2">
                {t("emptyFavorites", language)}
              </p>
              <p className="text-sm text-muted-foreground">
                Products you favorite will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
