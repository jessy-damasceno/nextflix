import Image from 'next/image';
import React, { FC } from 'react';

const Loading: FC = () => {
  const lottiePath = '/loading1.gif';
  return (
    <div className='flex justify-center align-middle'>
      <Image src={lottiePath} alt="Loading" width={ 26 } height={ 26 } />
    </div>
  );
};

export default Loading;