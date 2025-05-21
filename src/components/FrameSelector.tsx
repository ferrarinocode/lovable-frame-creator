
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Eye } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FrameSelectorProps {
  onFrameSelect: (frameSrc: string) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({ onFrameSelect }) => {
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
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
      onFrameSelect(selectedFrame);
      toast.success("Moldura selecionada com sucesso!");
    } else {
      // If no frame was uploaded, use the default one
      onFrameSelect(defaultFrame);
      toast.success("Moldura padrão selecionada!");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lon-blue">Escolha sua moldura</CardTitle>
        <CardDescription>Selecione uma moldura PNG transparente ou use nossa moldura padrão</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-8 text-center">
          <h3 className="font-medium text-gray-700 mb-4">Moldura padrão:</h3>
          <div className="mx-auto max-w-[300px] mb-6 border rounded-lg p-4 shadow-sm">
            <img 
              src={defaultFrame} 
              alt="Moldura padrão" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-4 mb-8">
            <h3 className="font-medium text-gray-700">Como funciona:</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-left">
              <li>Escolha uma moldura PNG com área transparente</li>
              <li>Faça o upload de sua foto</li>
              <li>Sua foto será ajustada para preencher a área transparente</li>
              <li>Baixe e compartilhe nas suas redes sociais!</li>
            </ol>
          </div>
        </div>
        
        <div className="space-y-6 w-full">
          <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-lon-blue">
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
              <div className="mx-auto max-w-[300px] border rounded-lg p-4">
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
              className="bg-lon-red hover:bg-lon-blue text-white flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5" />
                  <span>{selectedFrame ? "Continuar com esta moldura" : "Continuar com a moldura padrão"}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
