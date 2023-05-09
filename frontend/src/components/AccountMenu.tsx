import { FC } from 'react'
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import avatar from 'public/assets/default-red.png';


interface Props {
  visible?: boolean;
}

const AccountMenu: FC<Props> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className='bg-black bg-opacity-40 w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
          <Image className='w-8 rounded-md' src={avatar} alt='Avatar' />
          <p className='text-white text-sm group-hover/item:underline'>
            Username
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4' />
        <div onClick={() => signOut()} className='px-3 text-center text-white text-sm hover:underline cursor-pointer'>
          Sair da Nextflix
        </div>
      </div>
    </div>
  )
}

export default AccountMenu;
