/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'
import { Fragment } from 'react/jsx-runtime'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

// scss
import style from './InputFile.module.scss'

// components
import config from 'src/constants/config'
import { useRef } from 'react'

const cx = classNames.bind(style)

interface Props {
  onChange?: (value?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const { t } = useTranslation(['profile']) //dùng ns nào thì khai báo cụ thể ra
  const inputFileRef = useRef<HTMLInputElement>(null)
  // Không cần local vì set file vẫn ok nha không phụ thuộc vào value mà vào files

  // handler function
  // Khi thực hiện nhấn vào btn chọn ảnh thì sẽ click vào input file
  const handleUpload = () => {
    inputFileRef.current?.click()
  }

  const onUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    inputFileRef.current?.setAttribute('value', '')
    if (
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeImage || !fileFromLocal.type.includes('image'))
    ) {
      toast.error('Dung lượng file tối đa 1 MB và phải là định dạng:.JPEG, .PNG', {
        autoClose: 1000,
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  return (
    <Fragment>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={onUploadChange}
        //  Dùng để loại bỏ giá trị cũ trong file để có thể toast err nếu chọn trùng ânh
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event) => ((event.target as any).value = null)}
        hidden
        ref={inputFileRef}
      ></input>
      <button className={cx('input-file__image-btn')} type='button' onClick={handleUpload}>
        {t('profile.choose photos')}
      </button>
    </Fragment>
  )
}
