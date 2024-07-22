/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'
import { InputHTMLAttributes, forwardRef, useState } from 'react'

//scss
import style from './InputNumber.module.scss'

const cx = classNames.bind(style)

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

// eslint-disable-next-line prettier/prettier
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  { className, classNameInput, classNameError, errorMessage, value, onChange, ...rest },
  ref
) {
  const newClassName = className
    ? cx('input-number-form__wrap', className)
    : cx('input-number-form__wrap')
  const newClassInput = classNameInput ? classNameInput : cx('input-number-form__input')
  const newClassError = classNameError ? classNameError : cx('input-number-form__msg')
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // on change voi react hook form
      onChange && onChange(event)
      // on change local state
      setLocalValue(value)
    }
  }

  return (
    <div className={newClassName}>
      <input
        className={newClassInput}
        {...rest}
        onChange={handleChange}
        value={value === undefined ? localValue : value}
        ref={ref}
      />
      <p className={newClassError}>{errorMessage}</p>
    </div>
  )
})

export default InputNumber
