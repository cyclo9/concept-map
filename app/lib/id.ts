export const generateId = (len: number): string => {
	const crypto = require('crypto')
	const timestamp: string = Date.now().toString()
	const salt: string = Math.floor(Math.random() * parseInt(timestamp)).toString()
	const digest: string = crypto.createHash('sha256')
		.update(timestamp + salt)
		.digest('hex')
	
	return digest.slice(0, len)
}