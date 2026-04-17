'use server'

import { sleep } from 'atlibx'

export const userdata = async () => {
	const result = {
		profilePicture: 'https://api.dicebear.com/9.x/notionists/svg?seed=user',
		name: 'user',
		email: 'user@mail.com'
	}

	await sleep(1000)

	return result
}
