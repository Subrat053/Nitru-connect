const { uploadToCloudinary, isCloudinaryConfigured, cloudinary } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Upload file/image (Admin & Public Statement Upload)
// @route   POST /api/admin/upload or /api/upload
// @access  Public / Private
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const localFilePath = req.file.path;
    const folder = req.body.folder || 'nitru_connect';

    // Upload to Cloudinary (falls back to local filesystem if credentials are empty)
    const uploadResult = await uploadToCloudinary(localFilePath, folder);

    let fileUrl = uploadResult.url;
    if (fileUrl.startsWith('/')) {
      fileUrl = `${req.protocol}://${req.get('host')}${fileUrl}`;
    }

    res.status(200).json({
      success: true,
      url: fileUrl,
      public_id: uploadResult.public_id,
      original_name: req.file.originalname,
    });
  } catch (error) {
    console.error('File upload controller error:', error);
    res.status(500).json({ message: 'File upload execution failed: ' + error.message });
  }
};

// @desc    List all uploaded media files (local & Cloudinary)
// @route   GET /api/admin/media
// @access  Private
const listMedia = async (req, res) => {
  try {
    let mediaItems = [];

    // 1. Scan Local public/uploads folder
    const publicDir = path.join(__dirname, '..', '..', 'public', 'uploads');
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const stats = fs.statSync(filePath);
        mediaItems.push({
          public_id: file,
          url: `${req.protocol}://${req.get('host')}/uploads/${file}`,
          original_name: file,
          createdAt: stats.mtime,
          size: stats.size,
          type: 'local'
        });
      });
    }

    // 2. Scan Cloudinary if configured
    if (isCloudinaryConfigured) {
      try {
        // Query resources in Cloudinary
        const result = await cloudinary.api.resources({
          type: 'upload',
          max_results: 50
        });
        
        if (result && result.resources) {
          result.resources.forEach(resource => {
            mediaItems.push({
              public_id: resource.public_id,
              url: resource.secure_url,
              original_name: resource.filename || resource.public_id.split('/').pop(),
              createdAt: new Date(resource.created_at),
              size: resource.bytes,
              type: 'cloudinary'
            });
          });
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary listing error:', cloudinaryError);
        // Do not fail the whole request; local uploads might still be available
      }
    }

    // Sort by date descending
    mediaItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(mediaItems);
  } catch (error) {
    console.error('List media controller error:', error);
    res.status(500).json({ message: 'Failed to retrieve media library: ' + error.message });
  }
};

// @desc    Delete media file
// @route   DELETE /api/admin/media/:id
// @access  Private
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params; // public_id or filename
    
    // Check if it's a local file
    const publicDir = path.join(__dirname, '..', '..', 'public', 'uploads');
    const localFilePath = path.join(publicDir, id);

    let deleted = false;

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      deleted = true;
    }

    // Check if Cloudinary is configured, and try deleting from Cloudinary
    if (isCloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.destroy(id);
        if (result.result === 'ok') {
          deleted = true;
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error for ID:', id, cloudinaryError);
      }
    }

    if (deleted) {
      res.status(200).json({ success: true, message: 'Media item deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Media resource not found on server or Cloudinary.' });
    }
  } catch (error) {
    console.error('Delete media controller error:', error);
    res.status(500).json({ message: 'Failed to delete media resource: ' + error.message });
  }
};

module.exports = {
  uploadFile,
  listMedia,
  deleteMedia
};
