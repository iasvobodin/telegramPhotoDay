import ImageKit from "imagekit"
// import {fs} from 'fs';
export async function handler(event, context) {
    // var fs = require('fs');

    const imagekit = new ImageKit({
        publicKey: "public_zg1EKa88ulyR5u6XrMXDL07X4Dw=",
        privateKey: process.env.IMAGEKIT_PRIVATE,
        urlEndpoint: "https://ik.imagekit.io/svobodinaphoto/"
    });


    const authenticationParameters = imagekit.getAuthenticationParameters();
    console.log(authenticationParameters);
    return {
        headers: {
            /* Required for CORS support to work */
            'Access-Control-Allow-Origin': '*',
            /* Required for cookies, authorization headers with HTTPS */
            'Access-Control-Allow-Credentials': true
        },
        statusCode: 200,
        body: JSON.stringify(imagekit.getAuthenticationParameters()),
    };
};

