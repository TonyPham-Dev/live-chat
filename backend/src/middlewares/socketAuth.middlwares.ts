import { Socket } from "socket.io";
import { getUserData } from "../services/auth.services";

const socketAuth = async (socket: Socket, next: any) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        next(new Error("User is not logged in"));
    }
    try {
        const data = await getUserData(token);
        if (!data.success) {
            next(new Error("User is not logged in"));
        }
        socket.handshake.auth.nickname = data.userData?.nickname;
        next();
    } catch (error) {
        next(new Error("User is not logged in"));
    }
};

export default socketAuth;
