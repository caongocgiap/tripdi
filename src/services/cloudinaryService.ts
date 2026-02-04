const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (file: File): Promise<{ urlImage: string; publicId: string }> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "gallery/original");
  formData.append("resource_type", "image");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();

  return {
    urlImage: data.secure_url,
    publicId: data.public_id,
  };
};

export const getThumbnailUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_400,h_300,q_auto,f_auto/${publicId}`;
};

export const getPreviewUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fit,w_1600,q_auto,f_auto/${publicId}`;
};
