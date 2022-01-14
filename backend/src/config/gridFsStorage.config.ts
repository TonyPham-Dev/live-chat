import crypto from "crypto";
import path from "path";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import variables from "./variables.config";

const postStorage = new GridFsStorage({
    url: variables.dbUri,
    file: (_req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "images",
                };
                resolve(fileInfo);
            });
        });
    },
});

const chatStorage = new GridFsStorage({
    url: variables.dbUri,
    file: (_req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "chatImages",
                };
                resolve(fileInfo);
            });
        });
    },
});

export const postUpload = multer({ storage: postStorage });
export const chatUpload = multer({ storage: chatStorage });
