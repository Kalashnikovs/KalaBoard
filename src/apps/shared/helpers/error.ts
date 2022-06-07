import { ExtendedError } from '../interfaces/ExtendedError';

export function ThrowExtendedError(
    message?: string | undefined,
    status?: number,
    errors?: any,
    redirect?: string
): never {
    const error: ExtendedError = new Error(message);
    error.status = status;
    error.errors = errors;
    error.redirect = redirect;
    throw error;
}
