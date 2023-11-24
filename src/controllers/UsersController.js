
const UserRepositories = require("../repositories/UserRepositories");
const UserCreateService = require("../services/UserCreateService");
const ShowUserInformationService = require("../services/ShowUserInformationService");

class UsersController {
	async create(request, response) {
		const { name, email, password, phone } = request.body;

		const userRepositories = new UserRepositories();
		const userCreateService = new UserCreateService(userRepositories);

		const user = await userCreateService.execute({ name, email, password, phone });

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

		const userRepositories = new UserRepositories();
		const showUserInformationService = new ShowUserInformationService(userRepositories);

		const user = await showUserInformationService.execute(id);

		return response.json({ user });
	}

}

module.exports = UsersController;
