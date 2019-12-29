export function corsResponse(req, res, status, responseData) {
    res.setHeader("Access-Control-Allow-Origin", "https://bookworm-stats.mveith.com");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
    }
    res.status(status).send(responseData);
}