import { NavUserClient } from './client'
import { userdata } from '@/app/_actions/api/auth'

const NavUser = async () => {
	const user = await userdata()

	if (!user) {
		return null
	}

	const { profilePicture, name, email } = user

	return (
		<NavUserClient
			user={{
				name: name ?? '',
				email: email ?? '',
				avatar: profilePicture ?? ''
			}}
		/>
	)
}

export default NavUser
