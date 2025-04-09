const cloudinary = require("cloudinary");


  // Configuration
  cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

const uploadToCloudinary=async (file)=>{
    try{

    }catch(err){
        
    }
}
