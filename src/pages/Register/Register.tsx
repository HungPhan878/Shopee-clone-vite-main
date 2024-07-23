/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

//scss
import style from './Register.module.scss'

// components
// import { getRules } from 'src/utils/rules'
import { schema, SchemaType } from 'src/utils/rules'
import Input from 'src/Components/Input'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'
import { ErrorResponsiveApi } from 'src/types/util.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/Components/Button'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

const cx = classNames.bind(style)

const registerSchema = schema.pick(['email', 'confirm_password', 'password'])
type FormData = Pick<SchemaType, 'email' | 'password' | 'confirm_password'>

export default function Register() {
  const { t } = useTranslation(['login'])
  const navigate = useNavigate()
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
    setError
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(registerSchema)
  })

  // react query
  const registerAccountMutation = useMutation({
    mutationFn: (body: Pick<FormData, 'email' | 'password'>) => registerAccount(body)
  })

  // handler function
  const onSubmit = handleSubmit(
    (data) => {
      const body = omit(data, ['confirm_password'])

      registerAccountMutation.mutate(body, {
        onSuccess: (data) => {
          setAuthenticated(true)
          setProfile(data.data.data.user)
          navigate('/')
        },
        onError: (error) => {
          console.log(error)
          if (
            isAxiosUnprocessableEntityError<
              ErrorResponsiveApi<Pick<FormData, 'email' | 'password'>>
            >(error)
          ) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) =>
                setError(key as keyof Pick<FormData, 'email' | 'password'>, {
                  message: formError[key as keyof Pick<FormData, 'email' | 'password'>],
                  type: 'Server'
                })
              )
            }
          }
        }
      })
    }
    // ,
    // () => {
    //   const password = getValues('password')
    //   console.log(password)
    // }
  )

  return (
    <section className={cx('register')}>
      <Helmet>
        <title>Shopee Clone | Đăng Ký</title>
        <meta name='description' content='Trang đăng ký của Shopee Clone.' />
      </Helmet>
      <div className={cx('container', { 'register-container': true })}>
        <div className={cx('register-wrap')}>
          <div className='row'>
            <div className='offset-7 offset-lg-2 offset-md-0 col-5 col-lg-8 col-md-12'>
              <div className={cx('register-inner')}>
                <h2 className={cx('register-title')}>{t('register')}</h2>

                {/* form */}
                <form action='' className={cx('register-form')} noValidate onSubmit={onSubmit}>
                  <Input
                    name='email'
                    type='email'
                    placeholder={`Email/${t('phone number')}/${t('user name')}`}
                    register={register}
                    errorMessage={errors.email?.message}
                  />

                  <Input
                    name='password'
                    type='password'
                    placeholder={t('password')}
                    register={register}
                    autoComplete='on'
                    errorMessage={errors.password?.message}
                  />

                  <Input
                    name='confirm_password'
                    type='password'
                    placeholder={t('confirm password')}
                    register={register}
                    autoComplete='on'
                    errorMessage={errors.confirm_password?.message}
                  />

                  <Button
                    isLoading={registerAccountMutation.isPending}
                    disabled={registerAccountMutation.isPending}
                    className={cx('register-form__btn')}
                  >
                    {t('register')}
                  </Button>
                </form>

                <div className={cx('register-row')}>
                  <Link to='#' className={cx('register-text')}>
                    {t('login with sms')}
                  </Link>
                </div>

                <div className={cx('register-link')}>
                  {t('do you have an account yet')}?{' '}
                  <Link to={path.login} className={cx('register-link__text')}>
                    {t('login')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
