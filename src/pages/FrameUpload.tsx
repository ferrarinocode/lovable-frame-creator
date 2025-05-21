
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FrameUpload = () => {
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  // Default frame for demonstration
  const defaultFrame = "/lovable-uploads/6666656a-d829-45d8-85c3-3d15d31e1597.png";
  
  const handleFrameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (!file.type.includes('image/png')) {
        toast.error("Por favor, selecione apenas arquivos PNG");
        return;
      }
      
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedFrame(event.target.result as string);
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        toast.error("Falha ao processar a imagem");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleContinue = () => {
    if (selectedFrame) {
      // For a real app, we would upload this to a server and get an ID
      // For now, we'll use a simple URL parameter with the timestamp as frameId
      const frameId = `custom-${Date.now()}`;
      localStorage.setItem(frameId, selectedFrame);
      navigate(`/photo-upload/${frameId}`);
      toast.success("Moldura selecionada com sucesso!");
    } else {
      // If no frame was uploaded, use the default one
      navigate(`/photo-upload/default`);
      toast.success("Moldura padrão selecionada!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lon-pastel-blue to-lon-pastel-purple flex flex-col">
      <header className="py-6 px-4 glass">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-lon-blue to-lon-lightblue bg-clip-text text-transparent">
            LonFrame
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
            Transforme cada participante em mídia viva do seu evento
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-8 px-4 md:py-12">
        <div className="w-full max-w-3xl mb-10 text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-8 glass-card p-6 animate-float">
            Bem-vindo ao LonFrame! Comece selecionando ou carregando uma moldura para o seu evento.<br />
            Nossa plataforma transforma fotos comuns em peças promocionais memoráveis.
          </p>
        </div>

        <Card className="glass-card border-0 w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-to-r from-lon-blue to-lon-lightblue bg-clip-text text-transparent">Escolha ou carregue sua moldura</CardTitle>
            <CardDescription>Selecione uma moldura PNG transparente ou use nossa moldura padrão</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div className="mb-8 text-center">
                <h3 className="font-medium text-gray-700 mb-4">Moldura padrão:</h3>
                <div className="mx-auto max-w-[300px] mb-6 glass-card p-4">
                  <img 
                    src={defaultFrame} 
                    alt="Moldura padrão" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="space-y-4 mb-8 glass-card p-6">
                  <h3 className="font-medium text-gray-700">Como funciona:</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2 text-left">
                    <li>Escolha uma moldura PNG com área transparente</li>
                    <li>Na próxima etapa, você fará o upload da foto do participante</li>
                    <li>A foto será ajustada para preencher a área transparente da moldura</li>
                    <li>O participante poderá baixar e compartilhar nas redes sociais!</li>
                  </ol>
                </div>
              </div>
              
              <div className="space-y-6 w-full">
                <div className="glass-card transition-all duration-300 hover:shadow-xl p-8 text-center cursor-pointer hover:bg-lon-pastel-blue/30">
                  <input
                    type="file"
                    id="frameInput"
                    onChange={handleFrameUpload}
                    accept="image/png"
                    className="hidden"
                  />
                  <label htmlFor="frameInput" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-lon-blue" />
                    <p className="mt-4 text-sm text-gray-600">
                      Clique para fazer upload de sua própria moldura (PNG)
                    </p>
                  </label>
                </div>
                
                {selectedFrame && (
                  <div className="mt-6 text-center">
                    <h3 className="font-medium text-gray-700 mb-2">Moldura selecionada:</h3>
                    <div className="mx-auto max-w-[300px] glass-card p-4">
                      <img 
                        src={selectedFrame} 
                        alt="Moldura selecionada" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleContinue}
                    disabled={isUploading}
                    className="bg-gradient-to-r from-lon-blue to-lon-lightblue hover:opacity-90 text-white flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <span>{selectedFrame ? "Continuar com esta moldura" : "Continuar com a moldura padrão"}</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 px-4 text-center glass mt-10">
        <p className="text-gray-500 text-sm">
          LonFrame - Lon Systems
        </p>
      </footer>
    </div>
  );
};

export default FrameUpload;
