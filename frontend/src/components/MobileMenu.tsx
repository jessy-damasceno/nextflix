import { FC } from 'react';

interface Props {
	visible?: boolean;
}

const MOBILE_ITEMS = [
  'Início', 'Séries', 'Filmes', 'Bombando', 'Minha lista', 'Navegar por idiomas',
]

const MobileMenu: FC<Props> = ({ visible }) => {
  if (!visible) {
    return null;
  }

	return (
    <div className='bg-black w-56 absolute top-8 left-0 pq-5 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col gap-4'>
        {MOBILE_ITEMS.map((item, i) => (
          <div className='px-3 text-center text-white hover:underline' key={i}>
            {item}
        </div>
        ))}       
      </div>
    </div>
  );
};

export default MobileMenu;
