export type MessageType = {
  id: number,
  user_id: number,
  message: string,
  created_at: string,
  is_read?: boolean
}
export type UserType = {
  id: number,
  name: string,
  avatar_url: string,
  last_online: string,
}
export type DataType = {
  user_id: number,
  me: number,
  messages: Array<MessageType>,
  users_list: Array<UserType>
}