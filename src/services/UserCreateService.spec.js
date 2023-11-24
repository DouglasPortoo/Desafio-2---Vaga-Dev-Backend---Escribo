/* eslint-disable no-undef */
const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory =  require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService",()=>{
	let userRepositoryInMemory = null;
	let userCreateService = null ;

	beforeEach(()=>{
		userRepositoryInMemory = new UserRepositoryInMemory();
		userCreateService = new UserCreateService(userRepositoryInMemory);
	});

	it("user should be create", async ()=>{
		const user = {
			name:"User Test",
			email:"user@test.com",
			password:"123",
			phone:[{number:"9 8596-9633",ddd:"11"}]
		};
  
    
		const userCreated= await userCreateService.execute(user);
  
		expect(userCreated).toHaveProperty("id");
	});

	it("user not should be create with exist email", async ()=>{
		user1={
			name:"User Test 1",
			email:"user@teste.com",
			password:"123",
			phone:[{number:"9 8596-9633",ddd:"11"}]
		};

		user2={
			name:"User Test 2",
			email:"user@teste.com",
			password:"123456",
			phone:[{number:"9 8596-9633",ddd:"11"}]
		};

		await userCreateService.execute(user1);
		expect(async () => {
			await userCreateService.execute(user2);
		}).rejects.toEqual(new AppError("Este e-mail já está em uso."));
	});
});
