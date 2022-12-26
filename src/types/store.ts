export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type Notification = {
  [key in NotificationType]?: string
}

export type User = {
  id: string
  email: string
  displayName: string
}
