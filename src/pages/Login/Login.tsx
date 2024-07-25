/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginSchemaType, loginSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

//scss
import style from './Login.module.scss'

// components
// import { getRules } from 'src/utils/rules'
import Input from 'src/Components/Input'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'
import { ErrorResponsiveApi } from 'src/types/util.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/Components/Button'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

const cx = classNames.bind(style)

type FormData = LoginSchemaType

export default function Login() {
  const { t } = useTranslation(['login']) //dùng ns nào thì khai báo cụ thể ra
  const navigate = useNavigate()
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  // const rules = getRules()
  // react query
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  // handler function
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorResponsiveApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) =>
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            )
          }
        }
      }
    })
  })

  return (
    <section className={cx('login')}>
      <Helmet>
        <title>Shopee Clone | Đăng Nhập</title>
        <meta name='description' content='Trang đăng nhập của Shopee Clone.' />
      </Helmet>
      <div className={cx('container', { 'login-container': true })}>
        <div className={cx('login-wrap')}>
          <div className='row'>
            <div className='offset-7 offset-lg-2 offset-md-0 col-5 col-lg-8 col-md-12'>
              <div className={cx('login-inner')}>
                <h2 className={cx('login-title')}>{t('login')}</h2>

                {/* form */}
                <form action='' className={cx('login-form')} noValidate onSubmit={onSubmit}>
                  <Input
                    name='email'
                    type='email'
                    defaultValue='Hungphanhung9@gmail.com'
                    placeholder={`Email/${t('phone number')}/${t('user name')}`}
                    register={register}
                    errorMessage={errors.email?.message}
                  />

                  <Input
                    name='password'
                    type='password'
                    defaultValue='789789'
                    placeholder={t('password')}
                    register={register}
                    autoComplete='on'
                    errorMessage={errors.password?.message}
                  />

                  <Button
                    isLoading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                    className={cx('login-form__btn')}
                    type='submit'
                  >
                    {t('login')}
                  </Button>
                </form>

                <div className={cx('login-row')}>
                  <Link to='#' className={cx('login-text')}>
                    {t('forget password')}
                  </Link>
                  <Link to='#' className={cx('login-text')}>
                    {t('login with sms')}
                  </Link>
                </div>

                <div className={cx('login-link')}>
                  {t('are you new to shopee')}?{' '}
                  <Link to={path.register} className={cx('login-link__text')}>
                    {t('register')}
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
