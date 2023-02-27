import ImageKit from "imagekit"
// import {fs} from 'fs';
export async function handler(event, context) {
    // var fs = require('fs');

    const imagekit = new ImageKit({
        publicKey: "your_public_api_key",
        privateKey: process.env.IMAGEKIT_PRIVATE,
        urlEndpoint: "https://ik.imagekit.io/iasvobodin"
    });

    var authenticationParameters = imagekit.getAuthenticationParameters();
    console.log(authenticationParameters);
    return {
        statusCode: 200,
        body: JSON.stringify(imagekit.getAuthenticationParameters()),
    };
};

