import React from "react";
import { NavBar } from "@/components/NavBar";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { t } from "@/i18n/translations";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
  const { language, cart, removeFromCart, updateCartQuantity } = useApp();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar onSearch={() => {}} onAdminClick={() => {}} />

      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart size={32} className="text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t("cart", language)}
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <ShoppingCart
                size={48}
                className="mx-auto text-muted-foreground mb-4 opacity-50"
              />
              <p className="text-lg text-muted-foreground mb-2">
                {t("emptyCart", language)}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-4 flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        ${item.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQuantity(
                              item.id,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="w-12 text-center border border-border rounded px-2 py-1 bg-background text-foreground"
                        />
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {t("total", language)}
                  </h2>
                  <div className="space-y-2 mb-4 pb-4 border-b border-border">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-foreground mb-6">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    {t("checkout", language)}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
