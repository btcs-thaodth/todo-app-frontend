import { atom } from 'recoil'

import { Notification } from '../types/store'

export const notificationState = atom<Notification>({
  key: 'notification',
  default: {},
})
