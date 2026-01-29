import { useState, useRef, type ChangeEvent } from "react";

export const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const newImagesUrls = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...newImagesUrls]);
      // Reset inputa, aby można było wybrać ten sam plik ponownie jeśli usunięto
      event.target.value = "";
    }
  };

  const removeImage = (indexToRemove: number): void => {
    setSelectedImages((prevImages) => {
      const imageToRemove = prevImages[indexToRemove];
      URL.revokeObjectURL(imageToRemove); // Dobra praktyka: zwalnianie pamięci
      return prevImages.filter((_, index) => index !== indexToRemove);
    });
  };

  return {
    selectedImages,
    fileInputRef,
    handleImageButtonClick,
    handleFileChange,
    removeImage,
  };
};