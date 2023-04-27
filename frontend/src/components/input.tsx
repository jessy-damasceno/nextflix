import { FC } from 'react';

interface InputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type?: string;
	onFocus?: any;
	onBlur?: any;
	ref?: any;
	isValid?: boolean;
}

const Input: FC<InputProps> = ({
	id,
	onChange,
	value,
	label,
	type,
	onFocus,
	onBlur,
	ref,
	isValid,
}) => {
	return (
		<div className='relative'>
			<input
				onChange={onChange}
				type={type}
				value={value}
				id={id}
				className={`
          block
          rounded-md
          px-6
          py-6
          pb-1
          w-full
          text-nd
          ${!isValid ? 'border-b-2 border-orange-500' : ''}
          text-white
          bg-neutral-800
          appearance-none
          focus:outline-none
          focus:ring-0
          focus:bg-neutral-700
          peer
        `}
				placeholder=' '
				onFocus={onFocus}
				onBlur={onBlur}
				ref={ref}
			/>
			<label
				className={`
        absolute
        text-md
        text-zinc-400
        duration-150
        transform
        -translate-y-3
        scale-75
        top-4
        z-10
        origin-[0]
        left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
      `}
				htmlFor='email'
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
