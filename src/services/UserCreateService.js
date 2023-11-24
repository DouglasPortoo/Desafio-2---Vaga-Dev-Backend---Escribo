const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService{
	constructor(userRepositories){
		this.userRepositories=userRepositories;
	}

	async execute({name, email, password, phone}){

		const checkUserExists = await this.userRepositories.findByEmail(email);

		if (checkUserExists?.length > 0 ) {
			throw new AppError("Este e-mail já está em uso.");
		}

		const hashedPassword = await hash(password, 8);
		
		const user_id = await this.userRepositories.createUser({ name, email,password: hashedPassword });

		const PhoneInsert = phone.map(phone => {
			return {
				user_id,
				number: phone.number,
				ddd: phone.ddd
			};
		});

		await this.userRepositories.createPhone(PhoneInsert);

		const user = await this.userRepositories.findByid(user_id);

		return user;
	}
}

module.exports = UserCreateService;