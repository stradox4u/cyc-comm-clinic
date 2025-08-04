import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
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

const getPresignedUploadUrl = async (uploadType: UploadType) => {
  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: uploadType.key,
    ContentType: uploadType.fileType,
  })

  return await getSignedUrl(s3, command, { expiresIn: 60 })
}

const getPresignedDownloadUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: key,
  })

  return await getSignedUrl(s3, command, { expiresIn: 3 * 60 * 60 })
}

const deleteObject = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: key,
  })

  return await s3.send(command)
}

export default {
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
  deleteObject,
}
