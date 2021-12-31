import { Server } from "socket.io"
import messageHandler from "./listeners/chat/message"

const ioRoute: (chatIo: Server) => void = (chatIo) => {
    messageHandler(chatIo)
}
export default ioRoute
