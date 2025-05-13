
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface ImageEditorProps {
  userImage: string;
  frameImage: HTMLImageElement | null;
  isGeneratingDownload: boolean;
  setIsGeneratingDownload: (isGenerating: boolean) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ 
  userImage, 
  frameImage,
  isGeneratingDownload,
  setIsGeneratingDownload
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
    
    // Load user image
    const img = new Image();
    img.onload = () => {
      if (!ctx || !canvasRef.current) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scaling and positioning to fit user image
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (canvas.width - scaledWidth) / 2;
      const y = (canvas.height - scaledHeight) / 2;
      
      // Draw the user image centered and scaled
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      
      // Draw the frame on top
      ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      
      setIsRendered(true);
    };
    
    img.src = userImage;
  };

  const handleDownload = () => {
    if (!canvasRef.current || !isRendered) {
      toast.error("Please wait for the image to render completely");
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
            toast.error("Failed to generate image");
            setIsGeneratingDownload(false);
            return;
          }

          const url = URL.createObjectURL(blob);
          
          // Create an anchor element and trigger download
          const link = document.createElement('a');
          link.download = 'lon-systems-framed-photo.png';
          link.href = url;
          link.click();
          
          // Clean up
          URL.revokeObjectURL(url);
          setIsGeneratingDownload(false);
          toast.success("Image downloaded successfully!");
        }, 'image/png');
      } else {
        // For desktop browsers
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'lon-systems-framed-photo.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsGeneratingDownload(false);
        toast.success("Image downloaded successfully!");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
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
      
      <Button 
        onClick={handleDownload} 
        disabled={!isRendered || isGeneratingDownload}
        className="bg-lon-blue hover:bg-lon-lightblue text-white py-2 px-6 rounded-md flex items-center gap-2"
      >
        {isGeneratingDownload ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>Download Framed Photo</span>
          </>
        )}
      </Button>
    </div>
  );
};
