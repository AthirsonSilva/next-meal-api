export class PhoneParser {
	private phone: string

	constructor(phone: string) {
		this.phone = phone
	}

	parse() {
		return this.phone.replace(/\D/g, '')
	}
}
