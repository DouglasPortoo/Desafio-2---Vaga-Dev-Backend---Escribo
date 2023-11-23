const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require("../database/knex")

class UsersController {
  async create(request, response) {
    const { name, email, password, phone } = request.body

    const checkUserExists = await knex("users").where({ email });

    if (checkUserExists.length > 0) {
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    const [user_id] = await knex("users").insert({ name, email, password: hashedPassword });

    const PhoneInsert = phone.map(phone => {
      return {
        user_id,
        number: phone.number,
        ddd: phone.ddd
      }
    })

    await knex("phones").insert(PhoneInsert)

    return response.status(201).json({ name, email, password, phone })
  }
}

module.exports = UsersController
