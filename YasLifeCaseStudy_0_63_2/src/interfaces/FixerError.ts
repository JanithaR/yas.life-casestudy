export interface FixerError {
    success: boolean;
    error: { code: number; info: string };
}

export function instanceOfFixerError(object: any): object is FixerError {
    return 'error' in object;
}
