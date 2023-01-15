export const phoneParser = (phone: string) => {
	return phone.replace(/\D/g, '')
}
