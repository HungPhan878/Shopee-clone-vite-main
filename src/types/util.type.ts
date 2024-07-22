export interface ErrorResponsiveApi<Data> {
  message: string
  data?: Data
}

export interface SuccessResponsiveApi<Data> {
  message: string
  data: Data
}

// -? loại bỏ các type undefined của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
