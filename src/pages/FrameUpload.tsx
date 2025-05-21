import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { FileInput } from "@/components/ui/file-input";

const FrameUpload = () => {
  const navigate = useNavigate();
  const [uploadedFrameUrl, setUploadedFrameUrl] = useState<string | null>(null);
  const [isFrameUploaded, setIsFrameUploaded] = useState(false);

  const handleFrameUpload = (frameDataUrl: string) => {
    try {
      // Generate a unique ID for this custom frame
      const frameId = `custom-${Date.now()}`;
    
      // Store the frame in localStorage
      localStorage.setItem(frameId, frameDataUrl);
    
      // Set the uploaded frame and navigate to the photo upload page
      setUploadedFrameUrl(frameDataUrl);
      setIsFrameUploaded(true);
    
      toast.success("Moldura carregada com sucesso!");
    
      // Navigate to the photo upload page with the custom frame ID
      setTimeout(() => {
        navigate(`/photo-upload/${frameId}`);
      }, 1000);
    } catch (error) {
      console.error("Error saving frame:", error);
      toast.error("Erro ao salvar a moldura");
    }
  };

  const handleDefaultFrame = () => {
    navigate("/photo-upload/default");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lon-pastel-blue to-lon-pastel-green flex flex-col">
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

      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-3xl">
          <Card className="glass-card border-0 mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-lon-blue to-lon-lightblue bg-clip-text text-transparent">
                Carregue sua moldura personalizada
              </h2>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Selecione uma moldura PNG transparente para usar em suas fotos.
              </p>

              <FileInput 
                onFileSelected={handleFrameUpload}
                accept="image/png"
              />

              <div className="mt-8">
                <Button 
                  onClick={handleDefaultFrame}
                  className="lonpecta-gradient hover:opacity-90 text-white py-3 px-8 rounded-full text-lg"
                >
                  Usar moldura padrão
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 px-4 text-center glass mt-10">
        <p className="text-gray-500 text-sm">
          LonFrame - Lon Systems © 2025
        </p>
      </footer>
    </div>
  );
};

export default FrameUpload;
