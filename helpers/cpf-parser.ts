export const cpfParser = (cpf: string) => {
	return cpf.replace(/\D/g, '')
}
