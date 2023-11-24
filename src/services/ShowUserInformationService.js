
class UserCreateService{
	constructor(userRepositories){
		this.userRepositories=userRepositories;
	}

	async execute(id){

		const user = await this.userRepositories.findByid(id);

		return user;
	}
}

module.exports = UserCreateService;