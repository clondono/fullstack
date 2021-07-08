declare class HiveClient {
  constructor(client_key: string, options: any)
  getSummary(data: { task_id: string }): any

  asyncRequest(data: { image?: Buffer; image_url?: string; callback_url: string; metadata: any }): any
}

export default HiveClient
