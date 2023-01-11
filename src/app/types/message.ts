export interface Message {
    id?: number
    userId?: number
    toUserId: number
    sent: boolean
    type: string
    text: string
    image?: string
    reply?: string
    createAt: Date
}