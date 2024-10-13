import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = 'koach-ai-task1';
const s3Client = new S3Client();

export const handler = async (event) => {
    if (!event.body) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({
                error: 'Request body is required',
            }),
        };
    }
    
    const jsonData = JSON.parse(event.body);  // Get JSON data from request body
    const fileName = `file-${Date.now()}.json`;  // Create a unique file name
    
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(jsonData),
        ContentType: 'application/json',
    };

    try {
        const uploadResult = await s3Client.send(new PutObjectCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({
                e_tag: uploadResult.ETag,
                url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
            }),
        };
    } catch (err) {
        console.error('Error uploading JSON to S3:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to upload JSON to S3' }),
        };
    }
};

