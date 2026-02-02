import { useState, useRef, type ChangeEvent } from "react";

export const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);

      if (selectedFiles.length + filesArray.length > 4) {
        alert("Możesz dodać maksymalnie 4 pliki.");
        return;
      }

      const newImagesUrls = filesArray.map((file) => {
        const url = URL.createObjectURL(file);

        if (file.type.startsWith("video/")) {
          return `${url}#video`;
        }

        return url;
      });

      setSelectedImages((prev) => [...prev, ...newImagesUrls]);
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      event.target.value = "";
    }
  };

  const removeImage = (indexToRemove: number): void => {
    setSelectedImages((prevImages) => {
      const imageToRemove = prevImages[indexToRemove];
      URL.revokeObjectURL(imageToRemove);
      return prevImages.filter((_, index) => index !== indexToRemove);
    });

    setSelectedFiles((prevFiles) => {
      return prevFiles.filter((_, index) => index !== indexToRemove);
    });
  };

  const clearImages = () => {
    selectedImages.forEach((url) => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setSelectedFiles([]);
  };

  return {
    selectedImages,
    selectedFiles,
    fileInputRef,
    handleImageButtonClick,
    handleFileChange,
    removeImage,
    clearImages,
  };
};
