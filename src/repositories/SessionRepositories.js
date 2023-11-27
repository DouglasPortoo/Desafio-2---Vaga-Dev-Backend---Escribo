const knex = require("../database/knex");

class SessionRepositories {
	async findByEmail(email) {
		const user = await knex("users").where({ email });

		return user;
	}
}

module.exports = SessionRepositories;