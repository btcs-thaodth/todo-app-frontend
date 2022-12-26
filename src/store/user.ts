import { atom } from 'recoil'

import { User } from '../types/store'

export const userState = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
})
