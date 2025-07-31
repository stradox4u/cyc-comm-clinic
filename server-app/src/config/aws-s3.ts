import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from './config.js'

const s3 = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
})

type UploadType = {
  key: string
  fileType: string
}

const generateUploadUrl = async (uploadType: UploadType) => {
  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: uploadType.key,
    ContentType: uploadType.fileType,
    ACL: 'public-read',
  })

  return await getSignedUrl(s3, command, { expiresIn: 60 })
}

export default {
  generateUploadUrl,
}
