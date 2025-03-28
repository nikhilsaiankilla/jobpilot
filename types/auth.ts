export type registerResponse = {
    error?: string;

    message?: string;
    status: number;
    success: boolean;
    errors?: { error: string }[];
}

export type loginWithEmailResponse = {
    success: boolean;
    status: number;
    message?: string;
    error?: string;

    user?: {
        id: string,
        name: string,
        image?: string,
        email: string
    }
};