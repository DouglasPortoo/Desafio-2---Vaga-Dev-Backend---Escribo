const {verify} = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const AuthConfig = require("../configs/auth");

function ensureAuth (req, res, next){
	const authHeader = req.headers.authorization;

	const [, token] = authHeader.split(" ");
  
	if(!token){
		throw new AppError("Não autorizado",401);
	}
  
	try {
		const {sub: user_id} = verify(token,AuthConfig.jwt.secret);

		req.user = {
			id : Number(user_id)
		};

		return next();
    
	} catch {
		throw new AppError("Sessão inválida",401);
	}
}

module.exports = ensureAuth;