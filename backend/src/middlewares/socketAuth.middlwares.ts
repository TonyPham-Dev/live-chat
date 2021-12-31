import { Socket } from "socket.io"
import axios from "axios"
import variables from "../config/variables.config"

const socketAuth = async (socket: Socket, next: any) => {
    const token = socket.handshake.auth.token
    if (!token) {
        next(new Error("User is not logged in"))
    }
    try {
        const response = await axios
            .get(`https://${variables.auth0DomainUrl}/userinfo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((data) => data.data)
        if (response.status === 401) {
            next(new Error("User is not logged in"))
        }
        // set nickname
        socket.handshake.auth.nickname = response.nickname
        next()
    } catch (error) {
        next(new Error("User is not logged in"))
    }
}

export default socketAuth
