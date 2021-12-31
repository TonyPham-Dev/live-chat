import express, { Application } from "express"
import { createServer, Server } from "http"
import variables from "../config/variables.config"

interface ResponseType {
    app: Application
    server: Server
}

const createApp: () => ResponseType = () => {
    const app = express()

    const server = createServer(app)

    server.listen(variables.port, () => {
        console.log(`Server listening on port ${variables.port}`)
    })

    return { app, server }
}

export default createApp
