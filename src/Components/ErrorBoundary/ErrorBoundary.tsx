/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import classNames from 'classnames/bind'

// scss
import style from './ErrorBoundary.module.scss'

const cx = classNames.bind(style)

import { Component, ErrorInfo, ReactNode } from 'react'
import path from 'src/constants/path'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className={cx('error-boundary__wrapper')}>
          <h1 className={cx('error-boundary__heading')}>500</h1>
          <p className={cx('error-boundary__desc')}>Error!</p>
          <button className={cx('error-boundary__btn')}>
            <a href={path.home} className={cx('error-boundary__btn-link')}>
              <span className={cx('error-boundary__separate')} />
              <span className={cx('error-boundary__label')}>
                <span>Go Home</span>
              </span>
            </a>
          </button>
        </main>
      )
    }
    return this.props.children
  }
}
