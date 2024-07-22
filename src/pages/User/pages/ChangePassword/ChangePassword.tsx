/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

// scss
import style from './ChangePassword.module.scss'

// components
import Button from 'src/Components/Button'
import Input from 'src/Components/Input'
import { userSchema, userType } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { ErrorResponsiveApi } from 'src/types/util.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/util'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'

const cx = classNames.bind(style)

type FormData = Pick<userType, 'password' | 'confirm_password' | 'new_password'>
const passwordSchema = userSchema.pick(['password', 'confirm_password', 'new_password'])

export default function ChangePassword() {
  const { t } = useTranslation(['profile']) //dùng ns nào thì khai báo cụ thể ra
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  //[PUT] /user/update
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  // handler function
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      reset()
      toast.success(res.data.message, {
        autoClose: 1000
      })
    } catch (error) {
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

  return (
    <div className={cx('password-wrap')}>
      <Helmet>
        <title>Shopee Clone | Đổi Mật Khẩu</title>
        <meta name='description' content='Trang thay đổi mật khẩu bảo mật của bạn' />
      </Helmet>
      <div className={cx('password-info')}>
        <h1 className={cx('password-info__heading')}>{t('change password.change password')}</h1>
        <p className={cx('password-info__desc')}>
          {t('change password.Manage your password information')}
        </p>
      </div>

      <form className={cx('password-form')} onSubmit={onSubmit}>
        <div className='row'>
          <div className='col col-12'>
            <div className={cx('password-form__info')}>
              <div className={cx('password-form__row')}>
                <label className={cx('password-label')}>{t('change password.old password')}</label>
                <div className={cx('password-input__wrap')}>
                  <div className={cx('password-input__inner')}>
                    <Input
                      type='password'
                      name='password'
                      placeholder={t('change password.old password')}
                      classNameInput={cx('password-input')}
                      className={cx('mb-0')}
                      register={register}
                      errorMessage={errors.password?.message}
                    />
                  </div>
                </div>
              </div>

              <div className={cx('password-form__row')}>
                <label className={cx('password-label')}>{t('change password.new password')}</label>
                <div className={cx('password-input__wrap')}>
                  <div className={cx('password-input__inner')}>
                    <Input
                      type='password'
                      name='new_password'
                      placeholder={t('change password.new password')}
                      classNameInput={cx('password-input')}
                      className={cx('mb-0')}
                      register={register}
                      errorMessage={errors.new_password?.message}
                    />
                  </div>
                </div>
              </div>

              <div className={cx('password-form__row')}>
                <label className={cx('password-label')}>
                  {t('change password.confirm password')}
                </label>
                <div className={cx('password-input__wrap')}>
                  <div className={cx('password-input__inner')}>
                    <Input
                      type='password'
                      name='confirm_password'
                      placeholder={t('change password.confirm password')}
                      classNameInput={cx('password-input')}
                      className={cx('mb-0')}
                      register={register}
                      errorMessage={errors.confirm_password?.message}
                    />
                  </div>
                </div>
              </div>

              <div className={cx('password-form__row')}>
                <div className={cx('password-btn__wrap')}>
                  <Button className={cx('password-btn__submit')} type='submit'>
                    {t('profile.save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
