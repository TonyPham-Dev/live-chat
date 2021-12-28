import createApp from "./config/createApp"
import middlwares from "./middlewares/index"

const main = async function () {
    const { app, server } = createApp()
    middlwares(app)
}

main()
