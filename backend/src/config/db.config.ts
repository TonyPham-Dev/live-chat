import mongoose from "mongoose"
import variables from "../config/variables.config"

let gfs: any
let chatGfs: any
const connectDB: () => Promise<void> = async () => {
    try {
        await mongoose.connect(variables.dbUri)
        console.log("Connected to DB")
        gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "images",
        })
        chatGfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "chatImages",
        })
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export const getGfs = () => gfs

export const getChatGfs = () => chatGfs

export default connectDB
