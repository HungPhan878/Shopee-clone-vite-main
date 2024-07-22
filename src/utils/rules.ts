/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
//Cấu hình type cho key của getRules lỡ khi bâm nhầm key required còn báo lỗi để cho ta sửa chữa

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng điền email'
    },
    maxLength: {
      value: 160,
      message: 'Vui lòng nhập không quá 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Vui lòng nhập không dưới 5 kí tự'
    },
    pattern: {
      value: /.*@[a-z0-9.-]*/i,
      message: 'Nhập email không đúng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng điền password'
    },
    maxLength: {
      value: 160,
      message: 'Vui lòng nhập không quá 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Vui lòng nhập không dưới 6 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng điền lại password'
    },
    maxLength: {
      value: 160,
      message: 'Vui lòng nhập không quá 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Vui lòng nhập không dưới 6 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không đúng'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  // this.parent giúp ta lấy ra được obj cha của price min and max và .min or .max
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

function handleConfirmPasswordYup (refField: string) {
  return yup
    .string()
    .required('Vui lòng điền lại password')
    .min(6, 'Vui lòng nhập không dưới 6 kí tự')
    .max(160, 'Vui lòng nhập không quá 160 kí tự')
    .oneOf([yup.ref(refField)], 'Nhập lại mật khẩu không khớp')
}

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng điền email')
    .min(5, 'Vui lòng nhập không dưới 5 kí tự')
    .max(160, 'Vui lòng nhập không quá 160 kí tự')
    .email('Nhập email không đúng'),
  password: yup
    .string()
    .required('Vui lòng điền password')
    .min(6, 'Vui lòng nhập không dưới 6 kí tự')
    .max(160, 'Vui lòng nhập không quá 160 kí tự'),
  confirm_password: handleConfirmPasswordYup ('password'),
  price_min: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    // dùng test để viết ra được rule phức tạp hơn
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Vui Lòng Nhập Tên Sản Phẩm Bạn Cần Tìm Kiếm')
})

export const userSchema = yup.object().shape({
  name: yup.string().max(160, 'Vui lòng nhập không quá 160 kí tự'),
  phone: yup.string().max(20, 'Vui lòng nhập không quá 20 kí tự'),
  address: yup.string().max(160, 'Vui lòng nhập không quá 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  avatar: yup.string().max(1000, 'Vui lòng nhập không quá 1000 kí tự'),
  password: schema.fields['password'] as yup.StringSchema<string, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup ('new_password') as yup.StringSchema<
    string,
    yup.AnyObject,
    undefined,
    ''
  >
})

export const loginSchema = schema.pick(['email', 'password'])

export type userType = yup.InferType<typeof userSchema>
export type LoginSchemaType = yup.InferType<typeof loginSchema>
export type SchemaType = yup.InferType<typeof schema>
