import { put } from "@vercel/blob";

export default async function uploadImage(imageFile) {
  if (!imageFile) return null;

  const filename = `avatar-${Date.now()}-${imageFile.name}`;
  const contentType = imageFile.type || "image/png";
  const uploadedImage = await put(filename, imageFile, {
    contentType,
    contentLength: imageFile.size,
    access: "public",
  });

  return uploadedImage.url;
}
