const { ImageKit } = require("@imagekit/nodejs")
require("dotenv").config()

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
})

async function uploadFile(buffer, originalname) {
    const response = await client.files.upload({
        file: buffer.toString("base64"),
        fileName: originalname,
    })

    return response
}

module.exports = uploadFile