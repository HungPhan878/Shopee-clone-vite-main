/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosError } from 'axios'

// components
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import config from 'src/constants/config'
import noAvatar from 'src/assets/images/no-avatar.svg'
import { ErrorResponsiveApi } from 'src/types/util.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<Error>(error: unknown): error is AxiosError<Error> {
  return (
    isAxiosUnauthorizedError<ErrorResponsiveApi<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function percentDiscount(priceOriginal: number, priceCurr: number) {
  return Math.round(((priceOriginal - priceCurr) / priceOriginal) * 100) + '%'
}

export const removeSpecialCharacter = (str: string) =>
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}

export const getAvatarName = (avatarName?: string) =>
  avatarName ? `${config.baseURL}images/${avatarName}` : noAvatar
