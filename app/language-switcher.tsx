"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { currentLanguage, languages, changeLanguage, t } = useLanguage()

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="mb-4 text-xl font-bold">
          {t("language")}: {currentLanguage}
        </h2>
        <p className="mb-4">{t("webcomicPlatform")}</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {languages.find((lang) => lang.code === currentLanguage)?.nativeName || "Select Language"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={currentLanguage === lang.code ? "bg-accent" : ""}
              >
                <span>{lang.nativeName}</span>
                <span className="ml-2 text-muted-foreground">({lang.name})</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
