import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Code2, Zap, Wallet, TestTube2, Network, Lock, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import logoImage from "figma:asset/9ce0a2c711358792eb1dd87a2a838b1cf70ab840.png";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface HomePageProps {
  onEnterLab: () => void;
}

export function HomePage({ onEnterLab }: HomePageProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Bitcoin Lab" 
              className="h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button 
              onClick={onEnterLab}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {t.home.launchLab}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{t.home.heroTitle}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl text-gray-900 tracking-tight">
            Build, Test & Deploy
            <span className="block mt-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Bitcoin Applications
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.home.heroSubtitle}
          </p>
          
          <div className="flex gap-4 justify-center pt-6">
            <Button 
              onClick={onEnterLab}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8"
            >
              {t.home.getStarted}
              <Code2 className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-gray-300 h-12 px-8"
            >
              {t.home.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-3">{t.home.whyBitcoinLab}</h2>
          <p className="text-gray-600">{t.home.heroSubtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{t.home.features.visual.title}</h3>
              <p className="text-sm text-gray-600">
                {t.home.features.visual.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{t.home.features.secure.title}</h3>
              <p className="text-sm text-gray-600">
                {t.home.features.secure.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{t.home.features.wallet.title}</h3>
              <p className="text-sm text-gray-600">
                {t.home.features.wallet.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TestTube2 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{t.home.features.testing.title}</h3>
              <p className="text-sm text-gray-600">
                {t.home.features.testing.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{t.home.features.lightning.title}</h3>
              <p className="text-sm text-gray-600">
                {t.home.features.lightning.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{t.home.features.network.title}</h3>
              <p className="text-sm text-gray-600">
                {t.home.features.network.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Bitcoin Lab */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-900 mb-3">{t.home.whyBitcoinLab}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CLI tools can be daunting for newcomers and time-consuming for veterans. 
                    We believe testing Bitcoin applications should be accessible, fast, and enjoyable.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Bitcoin Lab brings the power of professional development tools to your browser, 
                    with an interface inspired by the best in the industry. Whether you're building 
                    your first Bitcoin app or you're a seasoned developer, Bitcoin Lab accelerates 
                    your workflow and makes testing a breeze.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-orange-200">
                <div>
                  <div className="text-3xl text-orange-600 mb-2">100%</div>
                  <p className="text-sm text-gray-600">Browser-based. No installation required.</p>
                </div>
                <div>
                  <div className="text-3xl text-orange-600 mb-2">Open</div>
                  <p className="text-sm text-gray-600">Source code available for transparency.</p>
                </div>
                <div>
                  <div className="text-3xl text-orange-600 mb-2">Free</div>
                  <p className="text-sm text-gray-600">Always free for developers worldwide.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl text-gray-900">{t.home.cta.title}</h2>
          <p className="text-xl text-gray-600">
            {t.home.cta.description}
          </p>
          <Button 
            onClick={onEnterLab}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-10 text-lg"
          >
            {t.home.cta.button}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <img 
                src={logoImage} 
                alt="Bitcoin Lab" 
                className="h-6 w-auto"
              />
              <span>© 2025</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-600 transition-colors">{t.home.footer.documentation}</a>
              <a href="#" className="hover:text-orange-600 transition-colors">{t.home.footer.github}</a>
              <a href="#" className="hover:text-orange-600 transition-colors">{t.home.footer.community}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
