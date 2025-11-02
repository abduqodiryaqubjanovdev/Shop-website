import React from "react";
import { NavBar } from "@/components/NavBar";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { t } from "@/i18n/translations";
import { Settings as SettingsIcon, Sun, Moon, Globe } from "lucide-react";

export default function Settings() {
  const { language, setLanguage, theme, setTheme } = useApp();

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar onSearch={() => {}} onAdminClick={() => {}} />

      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon size={32} className="text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t("settings", language)}
            </h1>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sun size={24} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  {language === "uz" ? "Qorong'i rejim" : "Dark Mode"}
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                {language === "uz"
                  ? "Qorong'i va yorug' rejimlari o'rtasida o'zgarish qiling"
                  : "Switch between dark and light modes"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    theme === "light"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  <Sun size={20} />
                  {language === "uz" ? "Yorug'" : "Light"}
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    theme === "dark"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  <Moon size={20} />
                  {language === "uz" ? "Qorong'i" : "Dark"}
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={24} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  {t("language", language)}
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                {language === "uz"
                  ? "Ilovani foydalanish tilini tanlang"
                  : "Choose your preferred language"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setLanguage("uz")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    language === "uz"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  <span className="text-lg">🇺🇿</span>
                  Uzbek (O\'zbek)
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    language === "en"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  <span className="text-lg">🇬🇧</span>
                  English
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {language === "uz" ? "Ilova haqida" : "About"}
              </h2>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    {language === "uz" ? "Versiya:" : "Version:"}
                  </span>{" "}
                  1.0.0
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    {language === "uz" ? "Ishlab chiqaruvchi:" : "Developer:"}
                  </span>{" "}
                  TechHub Team
                </p>
                <p className="text-sm pt-4">
                  {language === "uz"
                    ? "TechHub - eng yangi telefonlar va noutbuklar uchun raqamli bozor"
                    : "TechHub - Your go-to platform for the latest phones and laptops"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
