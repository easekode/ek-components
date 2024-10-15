export interface IApiError {
    message: string;
    status?: number;
    errors?: unknown | unknown[];
    errorCode?: string;
    source?: string;
    error?: unknown;
    isPublic?: boolean;
    stack?: string;
}