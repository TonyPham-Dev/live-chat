import express, { Application } from "express"
import cors from "cors"
import { auth } from "express-openid-connect"
import { config as auth0Config } from "../config/auth0"

const middlewares = (app: Application) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(auth(auth0Config))
}

export default middlewares
