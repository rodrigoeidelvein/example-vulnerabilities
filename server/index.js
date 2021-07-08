const server = require("./app")({
    logger: {
        level: 'info',
    }
});

server.listen(process.env.PORT || 5000)