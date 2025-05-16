"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Language = {
  code: string
  name: string
  nativeName: string
}

type LanguageContextType = {
  currentLanguage: string
  languages: Language[]
  translations: Record<string, string>
  changeLanguage: (code: string) => void
  t: (key: string) => string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [translations, setTranslations] = useState<Record<string, string>>({})

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return

    try {
      // Get user's preferred language from browser or localStorage
      const savedLanguage = localStorage.getItem("language") || navigator.language.split("-")[0]

      // Check if the saved language is supported
      const isSupported = languages.some((lang) => lang.code === savedLanguage)

      if (isSupported) {
        setCurrentLanguage(savedLanguage)
      }

      // Load translations for the current language
      loadTranslations(isSupported ? savedLanguage : "en")
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      // Fallback to English
      loadTranslations("en")
    }
  }, [])

  const loadTranslations = async (langCode: string) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/translations/${langCode}`);
      // const data = await response.json();

      // For development, use mock translations
      const mockTranslations: Record<string, string> = {
        // Common translations
        webcomicPlatform:
          langCode === "en"
            ? "Global Webcomic"
            : langCode === "es"
              ? "Cómic Global"
              : langCode === "fr"
                ? "BD Mondiale"
                : "Global Webcomic",
        home: langCode === "en" ? "Home" : langCode === "es" ? "Inicio" : langCode === "fr" ? "Accueil" : "Home",
        discover:
          langCode === "en"
            ? "Discover"
            : langCode === "es"
              ? "Descubrir"
              : langCode === "fr"
                ? "Découvrir"
                : "Discover",
        genres: langCode === "en" ? "Genres" : langCode === "es" ? "Géneros" : langCode === "fr" ? "Genres" : "Genres",
        popular:
          langCode === "en" ? "Popular" : langCode === "es" ? "Popular" : langCode === "fr" ? "Populaire" : "Popular",
        new: langCode === "en" ? "New" : langCode === "es" ? "Nuevo" : langCode === "fr" ? "Nouveau" : "New",
        search:
          langCode === "en" ? "Search" : langCode === "es" ? "Buscar" : langCode === "fr" ? "Rechercher" : "Search",
        language:
          langCode === "en" ? "Language" : langCode === "es" ? "Idioma" : langCode === "fr" ? "Langue" : "Language",
        toggleTheme:
          langCode === "en"
            ? "Toggle theme"
            : langCode === "es"
              ? "Cambiar tema"
              : langCode === "fr"
                ? "Changer de thème"
                : "Toggle theme",
        notifications:
          langCode === "en"
            ? "Notifications"
            : langCode === "es"
              ? "Notificaciones"
              : langCode === "fr"
                ? "Notifications"
                : "Notifications",
        profile:
          langCode === "en" ? "Profile" : langCode === "es" ? "Perfil" : langCode === "fr" ? "Profil" : "Profile",
        dashboard:
          langCode === "en"
            ? "Dashboard"
            : langCode === "es"
              ? "Panel"
              : langCode === "fr"
                ? "Tableau de bord"
                : "Dashboard",
        library:
          langCode === "en"
            ? "Library"
            : langCode === "es"
              ? "Biblioteca"
              : langCode === "fr"
                ? "Bibliothèque"
                : "Library",
        settings:
          langCode === "en"
            ? "Settings"
            : langCode === "es"
              ? "Ajustes"
              : langCode === "fr"
                ? "Paramètres"
                : "Settings",
        signOut:
          langCode === "en"
            ? "Sign Out"
            : langCode === "es"
              ? "Cerrar sesión"
              : langCode === "fr"
                ? "Déconnexion"
                : "Sign Out",
        signIn:
          langCode === "en"
            ? "Sign In"
            : langCode === "es"
              ? "Iniciar sesión"
              : langCode === "fr"
                ? "Connexion"
                : "Sign In",

        // Notification examples
        newEpisodeReleased:
          langCode === "en"
            ? "New episode released"
            : langCode === "es"
              ? "Nuevo episodio publicado"
              : langCode === "fr"
                ? "Nouvel épisode publié"
                : "New episode released",
        newComment:
          langCode === "en"
            ? "New comment on your comic"
            : langCode === "es"
              ? "Nuevo comentario en tu cómic"
              : langCode === "fr"
                ? "Nouveau commentaire sur votre BD"
                : "New comment on your comic",
        newFollower:
          langCode === "en"
            ? "New follower"
            : langCode === "es"
              ? "Nuevo seguidor"
              : langCode === "fr"
                ? "Nouvel abonné"
                : "New follower",
      }

      setTranslations(mockTranslations)
    } catch (error) {
      console.error(`Failed to load translations for ${langCode}:`, error)
      // Fallback to English if translations fail to load
      if (langCode !== "en") {
        loadTranslations("en")
      }
    }
  }

  const changeLanguage = (code: string) => {
    setCurrentLanguage(code)
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("language", code)
      }
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
    loadTranslations(code)
  }

  const t = (key: string) => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, languages, translations, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
