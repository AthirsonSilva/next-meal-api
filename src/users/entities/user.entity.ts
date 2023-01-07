export class User {
	constructor(data: User) {
		Object.assign(this, data)
	}

	email: string
	password: string
	name: string
	cpf: string
	phone: string
	photo: string
}
