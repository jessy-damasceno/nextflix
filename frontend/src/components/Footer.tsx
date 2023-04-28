import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='text-gray-500 bg-black md:bg-opacity-80 min-w-[200px] w-full'>
			<div className='w-full border-t-[1px] border-solid border-gray-500 md:hidden'></div>
			<div className='max-w-5xl mx-auto w-[90%] py-8'>
				<p className='mb-8'>
					Repositório:
				</p>
				<ul className='text-sm w-full flex justify-between flex-wrap'>
					<li>
						<Link
							href='https://github.com/jessy-damasceno/nextflix'
							target='_blank'
						>Saiba mais</Link>
					</li>
          <li>
						<Link
							href='https://linkedin.com/in/jessy-damasceno'
							target='_blank'
						>LinkedIn</Link>
					</li>
					<li>
						<Link href='https://github.com/jessy-damasceno' target='_blank'>GitHub</Link>
					</li>
					<li>
						<Link href='https://www.instagram.com/jessy.bass/' target='_blank'>Instagram</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
