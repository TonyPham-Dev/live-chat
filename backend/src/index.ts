import createApp from "./config/createApp.config"
import middlwares from "./middlewares/index.middlewares"
import connectDB from "./config/db.config"
import routes from "./routes/index.routes"
import { init as socketInit } from "./config/socketIo.config"
import ioRoute from "./socket"

const main = async function () {
    const { app, server } = createApp()
    const { chatIo } = socketInit(server)
    ioRoute(chatIo)
    middlwares(app)
    await connectDB()
    routes(app)
}

main()
