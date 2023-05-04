import { SetStateAction, useCallback, useState, useEffect } from 'react';
import Input from '@/components/Input';
import InputPassword from '@/components/InputPassword';
import { validateEmail } from '@/utils/isValidEmail';
import { registerUser } from '@/requests/users';

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');
	const [isValidPassword, setIsValidPassword] = useState(false);
	const [isValidRePassword, setIsValidRePassword] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const mailChange = (ev: { target: { value: SetStateAction<string> } }) => {
		const newValue = ev.target.value;
		setEmail(newValue);
		setIsValidEmail(validateEmail(newValue as string));
	};

	const nameChange = (ev: { target: { value: SetStateAction<string> } }) => {
		setName(ev.target.value);
	};

	const passWordChange = (ev: {
		target: { value: SetStateAction<string> };
	}) => {
		const newValue = ev.target.value;
		setPassword(newValue);

		if (newValue.length < 4 || newValue.length > 60) {
			setIsValidPassword(false);
		} else {
			setIsValidPassword(true);
		}
	};

	const repasswordChange = (ev: {
		target: { value: SetStateAction<string> };
	}) => {
		const newValue = ev.target.value;
		setRepassword(newValue);

		if (newValue.length < 4 || newValue.length > 60) {
			setIsValidRePassword(false);
		} else {
			setIsValidRePassword(true);
		}
	};

	const register = useCallback(
		async (e: any) => {
			e.preventDefault();
			if (password !== repassword) {
				setRepassword('');
        setIsDisabled(true);
				return alert('Repita a senha corretamente.');
			}

			try {
				await registerUser({
					email,
					name,
					password,
				});
			} catch (err) {
				console.log(err);
			}
		},
		[password, repassword, email, name]
	);

	useEffect(() => {
		if (name.length > 4 && isValidPassword && isValidRePassword) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [isValidPassword, isValidRePassword, name.length, password, repassword]);

	return (
		<>
			<div>
				<Input
					label='Nome'
					onChange={nameChange}
					id='name'
					type='text'
					value={name}
					isValid={name.length > 4}
				/>
				{name.length <= 4 && (
					<span className='text-orange-500 text-xs'>
						Informe um nome válido.
					</span>
				)}
			</div>
			<div>
				<Input
					label='Email'
					onChange={mailChange}
					id='email'
					type='email'
					value={email}
					isValid={isValidEmail}
				/>
				{!isValidEmail && (
					<span className='text-orange-500 text-xs'>
						Informe um email válido.
					</span>
				)}
			</div>
			<div>
				<InputPassword
					label='Senha'
					onChange={passWordChange}
					id='password'
					value={password}
					isValid={isValidPassword}
				/>
				{!isValidPassword && (
					<span className='text-orange-500 text-xs'>
						A senha deve ter entre 4 e 60 caracteres.
					</span>
				)}
			</div>
			<div>
				<InputPassword
					label='Repita a senha'
					onChange={repasswordChange}
					id='repassword'
					value={repassword}
					isValid={isValidRePassword}
				/>
				{!isValidRePassword && (
					<span className='text-orange-500 text-xs'>
						A senha deve ter entre 4 e 60 caracteres.
					</span>
				)}
			</div>
			<div>
				<button
					disabled={isDisabled}
					onClick={register}
					className='bg-[#e50914] py-3 text-white font-semibold rounded-md w-full mt-4 transition disabled:opacity-30'
				>
					Criar conta
				</button>
			</div>
		</>
	);
};

export default RegisterPage;
