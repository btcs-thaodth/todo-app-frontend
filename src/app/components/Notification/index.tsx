import { notification } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { notificationState } from '../../../store/notification'
import { NotificationType } from '../../../types/store'

export default function Notification() {
  const [toast, contextHolder] = notification.useNotification()
  const [toastMessage, setToastMessage] = useRecoilState(notificationState)
  const { t } = useTranslation()

  const type = Object.keys(toastMessage)[0] as NotificationType
  const message = toastMessage[type]

  useEffect(() => {
    if (!type || !message) return
    toast[type]({
      message: t(message),
      onClose: () => setToastMessage({}),
    })
  }, [toast, type, t, message, setToastMessage])

  return contextHolder
}
