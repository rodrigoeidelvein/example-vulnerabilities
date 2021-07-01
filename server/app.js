const fastify = require("fastify");
const db = require("./db");

function build(opts = {}) {
    const app = fastify(opts);

    app.register(require("fastify-cors"), {
        origin: "*",
    });

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

    app.get("/", async (request, reply) => {
        const { rows } = await db.query("SELECT NOW()");
        return { rows };
    });

    return app;
}

module.exports = build;
