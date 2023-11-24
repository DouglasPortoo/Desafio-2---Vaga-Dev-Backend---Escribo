const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");


const AuthConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionController {
	async create(req, res) {
		const { email, password } = req.body;

		const user = await knex("users").where({ email }).first();

		if (!user) {
			throw new AppError("Usuário e/ou senha inválidos", 401);
		}

		if (password) {
			const checkPassword = await compare(password, user.password);

			if (!checkPassword) {
				throw new AppError("Usuário e/ou senha inválidos", 401);
			}
		}

		const { expiresIn, secret } = AuthConfig.jwt;

		const token = sign({}, secret, {
			subject: String(user.id),
			expiresIn
		});

		return res.json({
			"id": user.id,
			"data da criação": user.created_at,
			"data da atualização": user.updated_at,
			"ultimo_login": new Date(),
			"token": token
		});
	}
}

module.exports = SessionController;