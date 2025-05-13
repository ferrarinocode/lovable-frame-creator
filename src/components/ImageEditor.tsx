
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface ImageEditorProps {
  userImage: string;
  frameImage: HTMLImageElement | null;
  isGeneratingDownload: boolean;
  setIsGeneratingDownload: (isGenerating: boolean) => void;
  onResetImage: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ 
  userImage, 
  frameImage,
  isGeneratingDownload,
  setIsGeneratingDownload,
  onResetImage
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (userImage && frameImage && canvasRef.current) {
      renderCompositeImage();
    }
  }, [userImage, frameImage]);

  const renderCompositeImage = () => {
    if (!canvasRef.current || !frameImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match the frame image
    canvas.width = frameImage.width;
    canvas.height = frameImage.height;
    
    // Create a temporary image to analyze the frame's transparent area
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = frameImage.width;
    tempCanvas.height = frameImage.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    
    // Draw frame to temp canvas to analyze transparent area
    tempCtx.drawImage(frameImage, 0, 0);
    const frameData = tempCtx.getImageData(0, 0, frameImage.width, frameImage.height);
    
    // Find the boundaries of the transparent area
    let left = frameImage.width, right = 0, top = frameImage.height, bottom = 0;
    
    for (let y = 0; y < frameImage.height; y++) {
      for (let x = 0; x < frameImage.width; x++) {
        const idx = (y * frameImage.width + x) * 4;
        // If pixel is transparent (alpha < 50)
        if (frameData.data[idx + 3] < 50) {
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
      }
    }
    
    // Calculate dimensions of the transparent area
    const cutoutWidth = right - left;
    const cutoutHeight = bottom - top;
    
    // Load user image
    const img = new Image();
    img.onload = () => {
      if (!ctx || !canvasRef.current) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scaling to fit the cutout area exactly
      const scaleX = cutoutWidth / img.width;
      const scaleY = cutoutHeight / img.height;
      const scale = Math.max(scaleX, scaleY); // Use max to ensure the image covers the entire cutout
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      // Center the image in the cutout area
      const x = left + (cutoutWidth - scaledWidth) / 2;
      const y = top + (cutoutHeight - scaledHeight) / 2;
      
      // Draw the user image centered and scaled to fill the cutout
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      
      // Draw the frame on top
      ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      
      setIsRendered(true);
    };
    
    img.src = userImage;
  };

  const handleDownload = () => {
    if (!canvasRef.current || !isRendered) {
      toast.error("Por favor, aguarde o carregamento completo da imagem");
      return;
    }

    setIsGeneratingDownload(true);

    try {
      // For mobile devices, we need a different approach
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // For mobile devices
        canvasRef.current.toBlob((blob) => {
          if (!blob) {
            toast.error("Falha ao gerar a imagem");
            setIsGeneratingDownload(false);
            return;
          }

          const url = URL.createObjectURL(blob);
          
          // Create an anchor element and trigger download
          const link = document.createElement('a');
          link.download = 'CISP-Encontro-SP-2025.png';
          link.href = url;
          link.click();
          
          // Clean up
          URL.revokeObjectURL(url);
          setIsGeneratingDownload(false);
          toast.success("Imagem baixada com sucesso!");
        }, 'image/png');
      } else {
        // For desktop browsers
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'CISP-Encontro-SP-2025.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsGeneratingDownload(false);
        toast.success("Imagem baixada com sucesso!");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Falha ao baixar a imagem");
      setIsGeneratingDownload(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative mb-6 max-w-full overflow-hidden border rounded-lg shadow-md">
        <canvas 
          ref={canvasRef} 
          className="max-w-full h-auto"
        />
        {!isRendered && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
            <div className="w-8 h-8 border-4 border-lon-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={handleDownload} 
          disabled={!isRendered || isGeneratingDownload}
          className="bg-lon-red hover:bg-lon-blue text-white py-2 px-6 rounded-md flex items-center gap-2"
        >
          {isGeneratingDownload ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Baixar imagem com moldura</span>
            </>
          )}
        </Button>
        
        <Button 
          onClick={onResetImage} 
          variant="outline"
          className="border-lon-blue text-lon-blue hover:bg-lon-blue hover:text-white flex items-center gap-2"
        >
          <RefreshCcw className="h-5 w-5" />
          <span>Carregar outra foto</span>
        </Button>
      </div>
    </div>
  );
};
