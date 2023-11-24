const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
	async create(request, response) {
		const { name, email, password, phone } = request.body;

		const checkUserExists = await knex("users").where({ email });

		if (checkUserExists.length > 0) {
			throw new AppError("Este e-mail já está em uso.");
		}

		const hashedPassword = await hash(password, 8);

		const [user_id] = await knex("users").insert({ name, email, password: hashedPassword });

		const PhoneInsert = phone.map(phone => {
			return {
				user_id,
				number: phone.number,
				ddd: phone.ddd
			};
		});

		await knex("phones").insert(PhoneInsert);

		const user = await knex("users").where({ id: user_id }).first();
		console.log(user);

		return response.status(201).json({
			"id": user.id,
			"data da criação": user.created_at,
			"data da atualização":user.updated_at,
			"ultimo_login": "Você ainda não fez Login",
			"token": "Faça Login para gerar seu token de autenticação"
		});
	}

	async show(request, response) {
		const id = request.user.id;

		const user = await knex("users").where({ id }).first();

		return response.json({ user });
	}

}

module.exports = UsersController;
