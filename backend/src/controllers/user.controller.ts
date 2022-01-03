import { Request, Response } from "express"
import UserModel from "../models/Users.models"
import { returnServerError } from "../app/constants"
class UserController {
    // [GET] /api/user/:username
    public async getUser(req: Request, res: Response) {
        try {
            const user = await UserModel.findOne({
                nickname: req.params.username,
            })
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }
            return res.json({ success: true, user })
        } catch (err) {
            return returnServerError(res, err.message)
        }
    }
}

export default new UserController()
