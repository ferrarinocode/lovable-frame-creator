
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageEditor } from "@/components/ImageEditor";
import { FrameSelector } from "@/components/FrameSelector";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const [selectedFrameSrc, setSelectedFrameSrc] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'frame-selection' | 'photo-upload'>('frame-selection');

  // Load the frame image when it's selected
  useEffect(() => {
    if (selectedFrameSrc) {
      const img = new Image();
      img.src = selectedFrameSrc;
      img.onload = () => {
        setFrameImage(img);
      };
      img.onerror = () => {
        toast.error("Erro ao carregar a moldura");
      };
    }
  }, [selectedFrameSrc]);

  const handleFrameSelect = (frameSrc: string) => {
    setSelectedFrameSrc(frameSrc);
    setCurrentStep('photo-upload');
  };

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    toast.success("Imagem carregada com sucesso!");
  };

  const handleResetImage = () => {
    setUploadedImage(null);
    toast.info("Você pode selecionar uma nova foto");
  };

  const handleBackToFrameSelection = () => {
    setCurrentStep('frame-selection');
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="py-6 px-4 border-b border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-lon-blue">
          CISP | Encontro SP 2025
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center py-8 px-4 md:py-12">
        <div className="w-full max-w-3xl mb-10 text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Vai participar do CISP | Encontro SP 2025? Então entre no clima!<br />
            Faça o upload da sua foto, aplique nossa moldura oficial e baixe para compartilhar com seus colegas nas redes sociais!
          </p>
        </div>

        <div className="w-full max-w-3xl grid gap-8">
          {currentStep === 'frame-selection' && (
            <FrameSelector onFrameSelect={handleFrameSelect} />
          )}
          
          {currentStep === 'photo-upload' && !uploadedImage && frameImage && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lon-blue">Upload da sua foto</CardTitle>
                <CardDescription>Selecione uma imagem JPG ou PNG para começar</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-6 text-center">
                  <h3 className="font-medium text-gray-700 mb-3">A moldura ficará assim:</h3>
                  <div className="mx-auto max-w-[300px]">
                    <img 
                      src={selectedFrameSrc || "/lovable-uploads/6666656a-d829-45d8-85c3-3d15d31e1597.png"} 
                      alt="Moldura CISP" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="w-full space-y-6">
                  <div className="space-y-4 mb-6">
                    <h3 className="font-medium text-gray-700 text-center">Como funciona:</h3>
                    <ol className="list-decimal list-inside text-gray-600 space-y-2 text-left">
                      <li>Faça o upload da sua foto</li>
                      <li>Veja o resultado com a moldura aplicada</li>
                      <li>Baixe a imagem final</li>
                      <li>Compartilhe nas suas redes sociais!</li>
                    </ol>
                  </div>
                  <ImageUploader onImageUpload={handleImageUpload} />
                  
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleBackToFrameSelection}
                      variant="outline"
                      className="border-lon-blue text-lon-blue hover:bg-lon-blue hover:text-white"
                    >
                      Voltar para seleção de moldura
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {currentStep === 'photo-upload' && uploadedImage && frameImage && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lon-blue">Preview & Download</CardTitle>
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
                
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleBackToFrameSelection}
                    variant="outline"
                    className="border-lon-blue text-lon-blue hover:bg-lon-blue hover:text-white"
                  >
                    Escolher outra moldura
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="py-6 px-4 mt-10 text-center">
        <p className="text-gray-300 text-sm">
          Lon Systems
        </p>
      </footer>
    </div>
  );
};

export default Index;
