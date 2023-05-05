import Link from 'next/link';
import { FC } from 'react';

interface InputProps {
	bold?: string;
	text: string;
	linkText: string;
	href: string;
}

const ErrorBox: FC<InputProps> = ({ bold, text, linkText, href }) => {
	return (
		<div className='text-[13.5px] relative rounded-md px-5 py-2.5 w-full text-nd text-white bg-[#e87c03]'>
			<p>
				{bold && <span className='font-semibold'>{bold} </span>}
				<span>{text} </span>
				<Link className='underline' href={href}>
					{linkText}
				</Link>
        .
			</p>
		</div>
	);
};

export default ErrorBox;
