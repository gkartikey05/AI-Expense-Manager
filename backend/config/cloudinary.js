const cloudinary = require("cloudinary").v2; 
const dotenv = require("dotenv");

dotenv.config(); 

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder: "eudaimo", //my folder
    });

    return uploadResult.secure_url; 
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw new Error("Failed to upload image");
  }
};

module.exports = uploadToCloudinary;
