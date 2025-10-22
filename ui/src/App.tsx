import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { LabInterface } from "./components/LabInterface";
import { Toaster } from "./components/ui/sonner";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "lab">("home");

  return (
    <LanguageProvider>
      {currentView === "home" ? (
        <HomePage onEnterLab={() => setCurrentView("lab")} />
      ) : (
        <LabInterface onBackToHome={() => setCurrentView("home")} />
      )}
      <Toaster />
    </LanguageProvider>
  );
}
