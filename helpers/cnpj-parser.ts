export class CnpjParser {
	private cnpj: string

	constructor(cnpj: string) {
		this.cnpj = cnpj
	}

	parse() {
		return this.cnpj.replace(/\D/g, '')
	}
}
