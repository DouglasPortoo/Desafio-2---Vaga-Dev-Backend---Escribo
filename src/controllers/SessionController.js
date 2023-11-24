const SessionRepositories = require("../repositories/SessionRepositories");
const SessionCreateService = require("../services/SessionCreateService");

class SessionController {
	async create(request, response) {
		const { email, password } = request.body;

		const sessionRepositories = new SessionRepositories();
		const sessionCreateService = new SessionCreateService(sessionRepositories);

		const data = await sessionCreateService.execute({ email, password });

		return response.status(201).json({
			"id": data.user.id,
			"data da criação": data.user.created_at,
			"data da atualização": data.user.updated_at,
			"ultimo_login": data.dataAtual,
			"token": data.token
		});
	}
}

module.exports = SessionController;