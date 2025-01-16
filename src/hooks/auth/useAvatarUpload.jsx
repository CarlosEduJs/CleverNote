import { useState } from "react";

export default function useAvatarUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      
    }
  };

  return { imagePreview, handleImageChange };
}

