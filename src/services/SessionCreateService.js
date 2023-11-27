const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");


const AuthConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");



class SessionCreateService{
	constructor(sessionRepositories){
		this.sessionRepositories=sessionRepositories;
	}

	async execute({ email, password } ){

		const [user] = await this.sessionRepositories.findByEmail(email);

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

		let dataAtual = new Date();
		let hora = dataAtual.getUTCHours();
		dataAtual.setUTCHours(hora - 3);

		return {
			user,
			token,
			dataAtual
		};
	}
}

module.exports= SessionCreateService;