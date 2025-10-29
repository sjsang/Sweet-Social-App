import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const createStorage = (folderName) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `Sweet_Social_App/${folderName}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
  });

export const uploadPostImage = multer({ storage: createStorage("posts") });
export const uploadAvatar = multer({ storage: createStorage("avatars") });