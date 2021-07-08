const server = require("./app")({
    logger: {
        level: 'info',
    }
});

server.listen(process.env.PORT, '0.0.0.0')