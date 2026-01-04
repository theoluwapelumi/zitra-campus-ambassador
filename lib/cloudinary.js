import { v2 as cloudinary } from 'cloudinary'

// Only configure if credentials are available
const isConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export async function uploadToCloudinary(file, folder = 'ambassador-applications') {
  if (!isConfigured) {
    console.warn('Cloudinary not configured - skipping file upload')
    return null
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            resolve(null) // Don't reject, just return null
          } else {
            resolve(result.secure_url)
          }
        }
      ).end(buffer)
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
}

export default cloudinary
