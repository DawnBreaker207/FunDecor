import { ReactNode } from 'react'
import './Button.module.scss'
type Props = {
  onClick?: () => void
  children: ReactNode
  width?: string,
}
const Button: React.FC<Props> = ({ children, width = 'auto', onClick }) => {
  return (
    <button
      className='btnCustom'

      style={{ width: `${width}` }} onClick={onClick}>{children}</button>
  )
}

export default Button