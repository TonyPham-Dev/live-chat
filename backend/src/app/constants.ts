import { Response } from "express"
export const returnServerError = (res: Response, message: string) => {
    return res
        .status(500)
        .json({ success: false, message: `Server error: ${message}` })
}
