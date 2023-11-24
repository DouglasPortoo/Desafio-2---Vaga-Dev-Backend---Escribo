class UserRepositoryInMemory{

	users = [];

	async findByEmail({email}){
		return this.users.find(user=> user.email === email);

	}

	async findByid(id){
  
		return this.users.find(user=> user.id === id);
	}

	async createUser({email,name,password,phones}){
		const user ={
			id:Math.floor(Math.random() * 1000) + 1,
			email,
			name,
			password,
			phones
		};

		this.users.push(user);

		return user.id;

	}

	async createPhone(PhoneInsert) {
    
		this.users.push(PhoneInsert);

		return;
	}
}

module.exports = UserRepositoryInMemory;