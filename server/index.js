const server = require("./app")({
    logger: {
        level: 'info',
        prettyPrint: true
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, '0.0.0.0');