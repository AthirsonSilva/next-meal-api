export class CpfParser {
	private cpf: string

	constructor(cpf: string) {
		this.cpf = cpf
	}

	parse() {
		return this.cpf.replace(/\D/g, '')
	}
}
