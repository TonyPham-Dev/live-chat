import { Request, Response } from "express"
import { returnServerError } from "../app/constants"
import UserModel from "../models/Users.models"
import { getUserData } from "../services/auth.services"

class AuthController {
    // [POST] /auth/login
    // @desc Login user
    public async login(req: Request, res: Response) {
        try {
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            )

            // add to mongodb
            const user = await UserModel.findOne({
                username: userData.nickname,
            })
            if (!user) {
                const newUser = new UserModel({
                    nickname: userData.nickname,
                    avatar: userData.picture,
                })
                await newUser.save()
                return res.json({
                    success: true,
                    userData,
                })
            }

            return res.json({ userData })
        } catch (err) {
            return returnServerError(res, err.message)
        }
    }
}

export default new AuthController()
