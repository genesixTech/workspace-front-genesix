import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Dashboard from "./components/Dashboard";
import Wizard from "./components/Wizard.jsx";
import StepPage from "./components/StepPage";
import DocumentsPage from "./components/DocumentsPage";
import DocumentDetailPage1 from "./components/DocumentDetailPage1";
import DocumentDetailPage2 from "./components/DocumentDetailPage2";
import DocumentDetailPage3 from "./components/DocumentDetailPage3";
import CollaboratorsPage from "./components/CollaboratorsPage";
import AnalyticsPage from "./components/AnalyticsPage";
import UserProfilePage from "./components/UserProfilePage";
import NotificationOverlay from "./components/NotificationOverlay";
import SettingsPage from "./components/SettingsPage";

const stepData = {
  "contexto-problema": {
    id: "contexto-problema",
    title: "Contexto e Problema",
    description:
      "Identificação inicial do problema e da oportunidade de mercado.",
    iaMessage:
      "E disse a IA: que haja contexto! ✨\n\nPara começarmos, me conte sobre o problema que seu produto busca resolver e o contexto atual do mercado. Qual a dor principal do seu usuário?",
    placeholder: "Descreva o problema e o contexto...",
    tasks: [
      { id: 1, text: "Definir o problema central" },
      { id: 2, text: "Analisar o cenário atual do mercado" },
      { id: 3, text: "Identificar a dor principal do usuário" },
      { id: 4, text: "Pesquisar soluções existentes" },
    ],
  },
  discovery: {
    id: "discovery",
    title: "Discovery",
    description: "Exploração do problema e levantamento de hipóteses iniciais",
    iaMessage:
      "Hora do Discovery! 🔍\n\nAgora que entendemos o problema, vamos explorar as oportunidades. Quais são as hipóteses iniciais que você tem para a solução? Quais funcionalidades você imagina?",
    placeholder: "Compartilhe suas hipóteses e ideias de funcionalidades...",
    tasks: [
      { id: 1, text: "Levantar hipóteses de solução" },
      { id: 2, text: "Brainstorm de funcionalidades" },
      { id: 3, text: "Mapear stakeholders" },
      { id: 4, text: "Definir escopo inicial" },
    ],
  },
  // Adicionar dados para outras etapas aqui
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // Hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove o #
      if (hash) {
        setActivePage(hash);
      }
    };

    // Verificar hash inicial
    handleHashChange();

    // Escutar mudanças no hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    window.location.hash = page;
  };

  const handleToggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
  };

  const handleOpenNotification = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Header
        onNavigate={handleNavigate}
        onOpenNotification={handleOpenNotification}
      />

      <LeftSidebar activeStep="discovery" onStepChange={handleNavigate} />

      {isNotificationOpen && (
        <NotificationOverlay
          isOpen={handleOpenNotification}
          onClose={handleCloseNotification}
        />
      )}

      <main
        className={`flex-1 overflow-auto pt-16 transition-all duration-300 ${isRightSidebarCollapsed ? "mr-16" : "mr-64"} ml-64`}
      >
        {activePage === "dashboard" && (
          <Dashboard
            onNavigate={handleNavigate}
            onOpenWizard={handleOpenWizard}
          />
        )}
        {activePage === "documents" && <DocumentsPage />}
        {activePage === "documents-step-1" && (
          <DocumentDetailPage1 onBack={() => handleNavigate("documents")} />
        )}
        {activePage === "documents-step-2" && (
          <DocumentDetailPage2 onBack={() => handleNavigate("documents")} />
        )}
        {activePage === "documents-step-3" && (
          <DocumentDetailPage3 onBack={() => handleNavigate("documents")} />
        )}
        {activePage === "collaboration" && <CollaboratorsPage />}
        {activePage === "analytics" && <AnalyticsPage />}
        {activePage === "profile" && <UserProfilePage />}
        {activePage === "settings" && <SettingsPage />}
        {activePage === "contexto-problema" && (
          <StepPage
            stepData={stepData["contexto-problema"]}
            onAdvanceStep={() => handleNavigate("discovery")}
          />
        )}
        {activePage === "discovery" && (
          <StepPage
            stepData={stepData["discovery"]}
            onAdvanceStep={() => handleNavigate("swot-csd")}
          />
        )}
      </main>

      <RightSidebar
        collapsed={isRightSidebarCollapsed}
        onToggle={handleToggleRightSidebar}
      />
      {isWizardOpen && <Wizard onClose={handleCloseWizard} />}
    </div>
  );
}

export default App;
