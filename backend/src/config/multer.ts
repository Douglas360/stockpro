import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import multer from 'multer';

interface FileObject {
    originalname: string;
    buffer: Buffer;
}

export const uploadFile = async (file?: FileObject, folderName?: string): Promise<string | Error> => {
    const s3 = new S3Client({
        // Configure your AWS credentials and region
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });


    const randomName = crypto.randomBytes(16).toString('hex');
    const newFileName = `${randomName}-${file?.originalname}`;

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `${folderName}/${newFileName}`,
        Body: file?.buffer,
        ACL: 'public-read',
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));
        //const fileUrl = `http://stockpro.com.br.s3-website-us-east-1.amazonaws.com/${folderName}/${newFileName}`;
        const fileUrl = `${process.env.AWS_BUCKET_URL}/${folderName}/${newFileName}`;
        return fileUrl;
    } catch (error) {
        console.log(error);
        return new Error('Failed to upload the file to S3');
    }
};

export const deleteFile = async (filePath: string): Promise<void | Error> => {
    const s3 = new S3Client({
        // Configure your AWS credentials and region
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });

    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: filePath,
    };


    try {
        await s3.send(new DeleteObjectCommand(deleteParams));

    } catch (error) {
        console.log(error);
        return new Error('Failed to delete the file from S3');
    }
};

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});
