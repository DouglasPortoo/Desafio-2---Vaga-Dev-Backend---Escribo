exports.up = knex => knex.schema.createTable("phones", table => {
	table.increments("id");
  
	table.text("number").notNullable();
	table.text("ddd").notNullable();

	table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});


exports.down = knex => knex.schema.dropTable("users");
