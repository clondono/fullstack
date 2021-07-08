export interface EmailMessage {
  bcc: string[]
  from: string
  to: string
  subject: string
  html: any
}

export interface EmailSendObj {
  bcc: string[]
  to?: string
  subject: string
  headers?: {}
  template: any
  data: { [key: string]: any }
}
