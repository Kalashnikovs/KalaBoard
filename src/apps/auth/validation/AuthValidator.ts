import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from '../../shared/validation/handler';

export function validateRegister(): RequestHandler[] {
	return [
		body('email', 'Bad Email Address')
			.exists()
			.trim()
			.isLength({ max: 64 })
			.isEmail()
			.normalizeEmail(),
		body(
			'username',
			'Username must be between 2-32 Characters, and can only contain Letters, and Numbers'
		)
			.exists()
			.trim()
			.isAlphanumeric()
			.isLength({ min: 2, max: 32 }),
		body(
			'password',
			'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number'
		)
			.exists()
			.trim()
			.isStrongPassword({
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			}),
		validationHandler,
	];
}

export function validateLogin(): RequestHandler[] {
	return [
		body('email', 'Bad Email Address')
			.exists()
			.trim()
			.isLength({ max: 64 })
			.isEmail()
			.normalizeEmail(),
		body('password', 'Bad Password').exists().trim(),
		validationHandler,
	];
}
