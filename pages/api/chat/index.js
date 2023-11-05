export default async function handler(req, res) {
    if (req.method === 'POST') {
        const message = req.body;
        res?.socket?.server?.io?.emit('message', message);
        res.status(201).json(message);
    }
};