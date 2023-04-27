import Input from './input';
import { FC, useCallback, useState } from 'react';

interface InputPasswordProps {
	id: string;
	label: string;
	value: string;
	onChange: any;
	isValid?: boolean;
}

const InputPassword: FC<InputPasswordProps> = ({
	id,
	label,
	value,
	onChange,
	isValid,
}) => {
	const [hidePassword, setHidePassword] = useState(true);
	const [showButton, setShowButton] = useState(false);

	const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setHidePassword((prevState) => !prevState);
	}, []);

	const handleFocus = useCallback(() => {
		setShowButton(true);
	}, []);

	const handleBlur = useCallback(() => {
		setHidePassword(true);
		setShowButton(false);
	}, []);

	return (
		<div className="relative" onFocus={handleFocus} onBlur={handleBlur}>
			<Input
				id={id}
				label={label}
				value={value}
				onChange={onChange}
				type={hidePassword ? 'password' : 'text'}
				isValid={isValid}
			/>
			{showButton && (
				<button
					className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-zinc-400"
					onMouseDown={handleClick}
				>
					{hidePassword ? 'MOSTRAR' : 'OCULTAR'}
				</button>
			)}
		</div>
	);
};

export default InputPassword;
