
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lon-pastel-blue to-lon-pastel-teal flex flex-col">
      <header className="py-6 px-4 glass">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center lonpecta-text">
            LonFrame
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
            Transforme cada participante em mídia viva do seu evento
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-3xl">
          <Card className="glass-card border-0 mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 lonpecta-text">
                Transforme cada participante em mídia viva do seu evento
              </h2>
              
              <div className="mb-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  O LonFrame é uma ferramenta poderosa que permite transformar fotos de participantes de eventos em peças promocionais memoráveis.
                </p>
                
                <div className="glass-card p-6 text-left mb-8">
                  <h3 className="font-medium text-gray-700 mb-4 text-center">Como funciona:</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-3">
                    <li><strong>Carregue sua moldura</strong> - Selecione uma moldura PNG transparente ou use nossa moldura padrão</li>
                    <li><strong>Compartilhe o link</strong> - Cada moldura terá uma página única para seus participantes</li>
                    <li><strong>Participantes carregam suas fotos</strong> - A foto será ajustada automaticamente</li>
                    <li><strong>Compartilhamento</strong> - Os participantes podem baixar e compartilhar nas redes sociais</li>
                  </ol>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/frame-upload")}
                className="lonpecta-gradient hover:opacity-90 text-white py-3 px-8 rounded-full text-lg flex items-center gap-2"
              >
                <span>Começar agora</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 text-center">
              <h3 className="font-medium text-gray-700 mb-3">Molduras Personalizadas</h3>
              <p className="text-gray-600">
                Carregue suas próprias molduras PNG transparentes para criar experiências únicas para cada evento.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <h3 className="font-medium text-gray-700 mb-3">Experiência Imersiva</h3>
              <p className="text-gray-600">
                Design futurístico e minimalista com interface intuitiva para todos os participantes.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 text-center glass mt-10">
        <p className="text-gray-500 text-sm">
          LonFrame - Lon Systems
        </p>
      </footer>
    </div>
  );
};

export default Index;
