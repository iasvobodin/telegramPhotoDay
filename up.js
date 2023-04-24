import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const ACCOUNT_ID = '875bd4d40c0c253d16cdb40f754731b5';
const ACCESS_KEY_ID = '9183e440228ce6e790988c03d1c4bff5';
const SECRET_ACCESS_KEY = '7724f935ca80cc0dfb15890fad2528bbd366c9ccd2be59800bfdccc5ab2da8d7';
const client = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});


const main = async () => {
    const command = new PutObjectCommand({
        Bucket: 'svobodinaphoto',
        Key: 'hello-s3.txt',
        Body: 'Hello S3!'
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};
main();