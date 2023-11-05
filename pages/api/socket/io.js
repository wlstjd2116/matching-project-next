import { Server as NetServer} from "http";
import { Server as ServerIO } from "socket.io";
import {Socket} from "net";
 
const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false
        })
        res.socket.server.io = io;
    }
}
export default ioHandler;