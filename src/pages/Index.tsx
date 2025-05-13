
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageEditor } from "@/components/ImageEditor";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);

  // Load the frame image when component mounts
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/6666656a-d829-45d8-85c3-3d15d31e1597.png";
    img.onload = () => {
      setFrameImage(img);
    };
    img.onerror = () => {
      toast.error("Error loading frame image");
    };
  }, []);

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    toast.success("Image uploaded successfully!");
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
          {!uploadedImage ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lon-blue">Upload da sua foto</CardTitle>
                <CardDescription>Selecione uma imagem JPG ou PNG para começar</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader onImageUpload={handleImageUpload} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lon-blue">Preview & Download</CardTitle>
                <CardDescription>Sua foto com moldura está pronta</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ImageEditor 
                  userImage={uploadedImage} 
                  frameImage={frameImage} 
                  isGeneratingDownload={isGeneratingDownload}
                  setIsGeneratingDownload={setIsGeneratingDownload}
                />
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
