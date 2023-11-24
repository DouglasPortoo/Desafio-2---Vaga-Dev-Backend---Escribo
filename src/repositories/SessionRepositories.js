const knex = require("../database/knex");

class SessionRepositories {
	async findByEmail(email) {
		const user = await knex("users").where({ email });

		return user;
	}

	async findByid(id) {
		const user = await knex("users").where({ id }).first();
    
		return user;
	}

	async createUser({ name, email, password}) {
    
		const [user_id] = await knex("users").insert({ name, email, password });

		return user_id ;
	}

	async createPhone(PhoneInsert) {
    
		await knex("phones").insert(PhoneInsert);

		return;
	}
}

module.exports = SessionRepositories;