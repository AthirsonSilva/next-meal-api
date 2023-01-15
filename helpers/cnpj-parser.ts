export const cnpjParser = (cnpj: string) => {
	return cnpj.replace(/\D/g, '')
}
