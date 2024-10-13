import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";


const bucketName = 'koach-ai-task1';
const s3Client = new S3Client();

export const handler = async () => {
    try {
        // List all objects in the S3 bucket
        const listParams = { Bucket: bucketName };
        const listResponse = await s3Client.send(new ListObjectsV2Command(listParams));

        // Return an empty array if there are no files
        if (!listResponse.Contents || listResponse.Contents.length === 0) {
            return {
                statusCode: 200,
                body: JSON.stringify([]), 
            };
        }

        // Retrieve the contents of each file
        const fileContents = await Promise.all(listResponse.Contents.map(async (file) => {
            const getParams = {
                Bucket: bucketName,
                Key: file.Key
            };

            const data = await s3Client.send(new GetObjectCommand(getParams));
            
            // Extract the body from the response (stream) and convert to a string
            const bodyContents = await streamToString(data.Body);
            return JSON.parse(bodyContents);  // Return parsed JSON
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(fileContents),
        };

    } catch (err) {
        console.error('Error retrieving files from S3:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve files from S3' }),
        };
    }
};

// Helper function to convert stream data to string
const streamToString = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
};
