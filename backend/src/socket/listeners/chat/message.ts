import socketAuth from "../../../middlewares/socketAuth.middlwares";
import { Server, Socket } from "socket.io";
import { newTextMessage } from "../../../services/message.services";

const messageHandler: (io: Server) => void = (io) => {
    const messageIo = io.of("/message");
    messageIo.use(socketAuth);
    messageIo.on("connection", (socket: Socket) => {
        const { roomId, nickname } = socket.handshake.auth;
        let roomIdTemp: string = roomId;
        socket.join(roomId);
        console.log("connected to socket.io");

        socket.on("text-message", async (message: string) => {
            const newMess = await newTextMessage(nickname, roomIdTemp, message);
            if (newMess.success) {
                socket.emit("new-text", nickname, message);
            }
        });
        socket.on("img-message", (imgs: string[]) => {
            socket.emit("new-img", nickname, imgs);
        });
        socket.on("change-room", (newRoomId: string) => {
            socket.join(newRoomId);
            socket.leave(roomId);
            roomIdTemp = newRoomId;
        });
    });
};

export default messageHandler;
