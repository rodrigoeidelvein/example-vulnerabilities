const fastify = require("fastify");
const db = require("./db");
const path = require('path');

function build(opts = {}) {
    const app = fastify(opts);

    app.register(require("fastify-cors"), {
        origin: "*",
    });

    app.register(require("fastify-static"), {
        root: path.resolve(__dirname, "../client/build")
    })

    app.post("/create", async (request, reply) => {
        const { usuario, senha, tipo } = request.body;
        const { rows } = await db.query(`
        INSERT INTO public.usuarios
        (usuario, senha, tipo)
        VALUES('${usuario}', '${senha}', '${tipo}');
        `);

        return { hello: "world" };
    });

    app.post("/login", async (request, reply) => {
        const { usuario, senha } = request.body;
        const { rows } = await db.query(
            `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND senha = '${senha}'`
        );

        if (!rows.length) {
            reply.code(200).send({ message: "Usuário não encontrado" });
        }

        return { usuario: rows };
    });

    app.get('*', function(request, response) {
        response.sendFile('index.html');
    });

    return app;
}

module.exports = build;
