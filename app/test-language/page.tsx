import LanguageSwitcher from "@/app/language-switcher"

export default function TestLanguagePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Language Test Page</h1>
      <p className="mb-6">
        This page allows you to test the language switching functionality. Use the dropdown below to change the
        language.
      </p>

      <LanguageSwitcher />

      <div className="mt-10">
        <p className="text-muted-foreground">
          Note: The language switcher in the header should also work across the entire application.
        </p>
      </div>
    </div>
  )
}
