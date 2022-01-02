import socketAuth from "../../../middlewares/socketAuth.middlwares"
import { Server, Socket } from "socket.io"
import { newTextMessage } from "../../../services/message.services"

const messageHandler: (io: Server) => void = (io) => {
    const messageIo = io.of("/message")
    messageIo.use(socketAuth)
    messageIo.on("connection", (socket: Socket) => {
        const { roomId, nickname } = socket.handshake.auth
        socket.join(roomId)
        console.log("connected to socket.io")

        socket.on("text-message", async (message: string) => {
            const newMess = await newTextMessage(nickname, roomId, message)
            if (newMess.success) {
                socket.broadcast.to(roomId).emit("new-text", nickname, message)
            }
        })
        socket.on("img-message", (imgs: string[]) => {
            socket.broadcast.to(roomId).emit("new-img", nickname, imgs)
        })
    })
}

export default messageHandler
