import socketAuth from "../../../middlewares/socketAuth.middlwares"
import { Server, Socket } from "socket.io"
import { newTextMessage } from "../../../services/message.services"

const messageHandler: (io: Server) => void = (io) => {
    const messageIo = io.of("/message")
    messageIo.use(socketAuth)
    messageIo.on("connection", (socket: Socket) => {
        const { roomId, user } = socket.handshake.auth
        socket.join(roomId)

        socket.on("message", async (message: string) => {
            const newMess = await newTextMessage(message, user, roomId)
            if (newMess.success) {
                socket.broadcast.to(roomId).emit("new-message", user, message)
            }
        })
    })
}

export default messageHandler
