const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary if environment variables are present
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Cloudinary environment variables not fully set. Falling back to local storage uploads.');
}

const uploadToCloudinary = async (filePath, folder = 'nitru_connect') => {
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'auto',
      });
      // Delete temporary file from local disk
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  } else {
    // Local fallback: move file to public uploads directory
    try {
      const fileName = path.basename(filePath);
      const publicDir = path.join(__dirname, '..', '..', 'public', 'uploads');
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      const destinationPath = path.join(publicDir, fileName);
      fs.renameSync(filePath, destinationPath);
      
      const relativeUrl = `/uploads/${fileName}`;
      return {
        url: relativeUrl,
        public_id: fileName,
      };
    } catch (error) {
      console.error('Local file fallback save error:', error);
      throw error;
    }
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  isCloudinaryConfigured
};
