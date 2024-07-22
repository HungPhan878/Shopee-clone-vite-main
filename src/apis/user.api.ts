/* eslint-disable prettier/prettier */
import { User } from 'src/types/user.type'
import { SuccessResponsiveApi } from 'src/types/util.type'
import http from 'src/utils/http'

interface BodyUpdateType
  extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt' | '__v'> {
  password?: string
  new_password?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponsiveApi<User>>('me')
  },
  updateProfile(body: BodyUpdateType) {
    return http.put<SuccessResponsiveApi<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponsiveApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
