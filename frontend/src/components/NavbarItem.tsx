import { FC } from 'react'

interface Props {
  label: string;
}

const NavbarItem: FC<Props> = ({ label }) => {
  return (
    <div className='text-white text-sm cursor-pointer hover:text-gray-400 transition duration-300'>
      {label}
    </div>
  )
}

export default NavbarItem