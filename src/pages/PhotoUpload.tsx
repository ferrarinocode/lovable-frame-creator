
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageEditor } from "@/components/ImageEditor";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const PhotoUpload = () => {
  const { frameId } = useParams<{ frameId: string }>();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const [isLoadingFrame, setIsLoadingFrame] = useState(true);

  // Default frame for demonstration
  const defaultFrame = "/lovable-uploads/6666656a-d829-45d8-85c3-3d15d31e1597.png";
  
  // Load the frame image based on the frameId
  useEffect(() => {
    if (!frameId) {
      toast.error("Nenhuma moldura selecionada");
      navigate("/");
      return;
    }

    setIsLoadingFrame(true);
    let frameSrc = "";
    
    if (frameId === "default") {
      frameSrc = defaultFrame;
    } else if (frameId.startsWith("custom-")) {
      try {
        const storedFrame = localStorage.getItem(frameId);
        if (storedFrame) {
          frameSrc = storedFrame;
        } else {
          // Handle case where frame isn't in local storage
          console.error("Frame not found in local storage:", frameId);
          toast.error("Moldura não encontrada no armazenamento local");
          navigate("/frame-upload");
          return;
        }
      } catch (error) {
        console.error("Error retrieving frame from storage:", error);
        toast.error("Erro ao carregar a moldura");
        navigate("/frame-upload");
        return;
      }
    }

    console.log("Loading frame from source:", frameSrc);

    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable CORS for the image
    img.src = frameSrc;
    
    img.onload = () => {
      console.log("Frame loaded successfully");
      setFrameImage(img);
      setIsLoadingFrame(false);
    };
    
    img.onerror = (error) => {
      console.error("Error loading frame image:", error);
      toast.error("Erro ao carregar a moldura");
      navigate("/frame-upload");
    };
  }, [frameId, navigate]);

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    toast.success("Imagem carregada com sucesso!");
  };

  const handleResetImage = () => {
    setUploadedImage(null);
    toast.info("Você pode selecionar uma nova foto");
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
            Carregue sua foto para aplicar a moldura selecionada!<br />
            Depois baixe e compartilhe nas redes sociais.
          </p>
        </div>

        <div className="w-full max-w-3xl grid gap-8">
          {isLoadingFrame && (
            <Card className="glass-card border-0 p-8 text-center">
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-12 h-12 border-4 border-lon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Carregando sua moldura...</p>
              </div>
            </Card>
          )}

          {!isLoadingFrame && !uploadedImage && frameImage && (
            <Card className="glass-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="bg-gradient-to-r from-lon-blue to-lon-lightblue bg-clip-text text-transparent">Upload da sua foto</CardTitle>
                <CardDescription>Selecione uma imagem JPG ou PNG para começar</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-6 text-center">
                  <h3 className="font-medium text-gray-700 mb-3">A moldura selecionada:</h3>
                  <div className="mx-auto max-w-[300px] glass-card p-4">
                    <img 
                      src={frameImage.src} 
                      alt="Moldura selecionada" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="w-full space-y-6">
                  <div className="space-y-4 mb-6 glass-card p-4">
                    <h3 className="font-medium text-gray-700 text-center">Como funciona:</h3>
                    <ol className="list-decimal list-inside text-gray-600 space-y-2 text-left">
                      <li>Faça o upload da sua foto</li>
                      <li>Veja o resultado com a moldura aplicada</li>
                      <li>Baixe a imagem final</li>
                      <li>Compartilhe nas suas redes sociais!</li>
                    </ol>
                  </div>
                  <ImageUploader onImageUpload={handleImageUpload} />
                </div>
              </CardContent>
            </Card>
          )}
          
          {!isLoadingFrame && uploadedImage && frameImage && (
            <Card className="glass-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="bg-gradient-to-r from-lon-blue to-lon-lightblue bg-clip-text text-transparent">Preview & Download</CardTitle>
                <CardDescription>Sua foto com moldura está pronta</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ImageEditor 
                  userImage={uploadedImage} 
                  frameImage={frameImage} 
                  isGeneratingDownload={isGeneratingDownload}
                  setIsGeneratingDownload={setIsGeneratingDownload}
                  onResetImage={handleResetImage}
                />
              </CardContent>
            </Card>
          )}
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

export default PhotoUpload;
