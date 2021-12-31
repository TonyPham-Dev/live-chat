import { Server } from "socket.io"
import { Server as HttpServer } from "http"
let chatIo: undefined | Server = undefined
import variables from "../config/variables.config"

export const getChatIo: () => undefined | Server = () => chatIo
export const init: (httpServer: HttpServer) => { chatIo: undefined | Server } =
    (httpServer) => {
        chatIo = new Server(httpServer, {
            cors: { origin: variables.corsOrigin },
            path: "/chat",
        })
        return { chatIo }
    }
