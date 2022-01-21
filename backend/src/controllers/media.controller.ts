import { Request, Response } from "express";
import { returnServerError } from "../app/constants";
import { getGfs, getChatGfs } from "../config/db.config";

class ImageController {
    // [GET] /api/media/:filename
    // @desc Get images from filename
    public filename(req: Request, res: Response): void {
        getGfs()
            .find({ filename: req.params.filename })
            .toArray((err: Error, files: Express.Multer.File[]) => {
                if (err) {
                    return returnServerError(res, err.message);
                }
                if (!files || files.length === 0) {
                    return res
                        .status(404)
                        .json({ success: false, message: "File not found" });
                }
                getGfs()
                    .openDownloadStreamByName(req.params.filename)
                    .pipe(res);
            });
    }
    // [GET] /api/media/chat/:filename
    // @desc Get chat images from filename
    public chatImg(req: Request, res: Response): void {
        getChatGfs()
            .find({ filename: req.params.filename })
            .toArray((err: Error, files: Express.Multer.File[]) => {
                if (err) {
                    return returnServerError(res, err.message);
                }
                if (!files || files.length === 0) {
                    return res
                        .status(404)
                        .json({ success: false, message: "File not found" });
                }
                getChatGfs()
                    .openDownloadStreamByName(req.params.filename)
                    .pipe(res);
            });
    }
}

export default new ImageController();
