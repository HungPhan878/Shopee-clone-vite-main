import { User } from './user.type.ts'
import { SuccessResponsiveApi } from './util.type.ts'

export type AuthResponsive = SuccessResponsiveApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_tokenL: number
  user: User
}>

export type RefreshTokenResponse = SuccessResponsiveApi<{
  access_token: string
}>
