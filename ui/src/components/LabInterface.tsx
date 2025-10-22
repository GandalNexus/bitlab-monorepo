import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TransactionBuilder } from "./TransactionBuilder";
import { SignTransaction } from "./SignTransaction";
import { ViewTransaction } from "./ViewTransaction";
import { Faucet } from "./Faucet";
import { Lightning } from "./Lightning";
import { WalletManager } from "./WalletManager";
import { NetworkSelector } from "./NetworkSelector";
import { Button } from "./ui/button";
import { 
  Wallet, 
  Code2, 
  Eye, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Home,
  TestTube2,
  Zap,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import logoImage from "figma:asset/9ce0a2c711358792eb1dd87a2a838b1cf70ab840.png";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface LabInterfaceProps {
  onBackToHome: () => void;
}

export function LabInterface({ onBackToHome }: LabInterfaceProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("build");
  const { t } = useLanguage();

  const navItems = [
    { id: "build", label: t.lab.buildTransaction, icon: Wallet },
    { id: "sign", label: t.lab.signTransaction, icon: Code2 },
    { id: "view", label: t.lab.viewTransaction, icon: Eye },
    { id: "faucet", label: t.lab.faucet, icon: TestTube2 },
    { id: "lightning", label: t.lab.lightning, icon: Zap },
    { id: "wallet", label: t.lab.walletManager, icon: Settings },
  ];

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={mobile ? "p-4" : "p-3"}>
      <div className="space-y-1">
        {!sidebarCollapsed && !mobile && (
          <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">
            Tools
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-orange-50/50 hover:text-orange-600"
              } ${sidebarCollapsed && !mobile ? "justify-center" : ""}`}
              title={sidebarCollapsed && !mobile ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {(!sidebarCollapsed || mobile) && <span>{item.label}</span>}
            </button>
          );
        })}

        {(!sidebarCollapsed || mobile) && (
          <>
            <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider mt-6">
              Endpoints
            </div>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50/50 hover:text-orange-600 rounded-md transition-colors">
              Get Transaction
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50/50 hover:text-orange-600 rounded-md transition-colors">
              Get Block
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50/50 hover:text-orange-600 rounded-md transition-colors">
              Get Address Info
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50/50 hover:text-orange-600 rounded-md transition-colors">
              Broadcast Transaction
            </a>
          </>
        )}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="py-4 px-3 border-b border-gray-200">
                  <img 
                    src={logoImage} 
                    alt="Bitcoin Lab" 
                    className="h-10 w-auto"
                  />
                </div>
                <div className="sr-only">
                  <SheetTitle>{t.lab.navigation}</SheetTitle>
                  <SheetDescription>{t.lab.accessTools}</SheetDescription>
                </div>
                <SidebarContent mobile />
              </SheetContent>
            </Sheet>

            <button 
              onClick={onBackToHome}
              className="hidden lg:flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src={logoImage} 
                alt="Bitcoin Lab" 
                className={`transition-all ${sidebarCollapsed ? 'h-8' : 'h-10'} w-auto`}
              />
            </button>
            <Button
              onClick={onBackToHome}
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600"
            >
              <Home className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <NetworkSelector />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:block border-r border-gray-200 bg-gray-50/50 overflow-y-auto transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <SidebarContent />
          
          {/* Collapse Button */}
          <div className="p-3 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`w-full ${sidebarCollapsed ? "justify-center" : "justify-start"}`}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Collapse
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {activeTab === "build" && <TransactionBuilder />}
            {activeTab === "sign" && <SignTransaction />}
            {activeTab === "view" && <ViewTransaction />}
            {activeTab === "faucet" && <Faucet />}
            {activeTab === "lightning" && <Lightning />}
            {activeTab === "wallet" && <WalletManager />}
          </div>
        </main>
      </div>
    </div>
  );
}
