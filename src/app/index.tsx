import 'dayjs/locale/ja'
import '../styles/global.css'
import '../styles/antd.css'

import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Notification from './components/Notification'
import Routes from './components/Routes'

export default function App() {
  const { i18n } = useTranslation()
  const locale = i18n.language.slice(0, 2)

  useEffect(() => {
    dayjs.locale(locale)
  }, [locale])

  return (
    <ConfigProvider locale={locale === 'ja' ? jaJP : enUS}>
      <Notification />
      <Routes />
    </ConfigProvider>
  )
}
