import express, { Application } from "express"
import { createServer, Server } from "http"

interface ResponseType {
    app: Application
    server: Server
}

const createApp: () => ResponseType = () => {
    const PORT = process.env.PORT || 3000

    const app = express()

    const server = createServer(app)

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
    return { app, server }
}

export default createApp
