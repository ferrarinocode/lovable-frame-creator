
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-lon-blue mb-2">Lon Systems</h1>
        <p className="text-gray-600 max-w-2xl">
          Upload your photo and download it with our professional frame overlay
        </p>
      </header>

      <div className="w-full max-w-3xl grid gap-8">
        {!uploadedImage ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lon-blue">Upload Your Photo</CardTitle>
              <CardDescription>Select a JPG or PNG image to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader onImageUpload={handleImageUpload} />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lon-blue">Preview & Download</CardTitle>
              <CardDescription>Your framed photo is ready</CardDescription>
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
    </div>
  );
};

export default Index;
