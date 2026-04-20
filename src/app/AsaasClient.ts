import {env} from "~/env";

interface Client {
    name: string;
    cpfCnpj: string;
    email: string;
}

interface SuccessResponse {
    id: string;
    encodedImage: string;
    payload: string;
    allowsMultiplePayments: boolean;
    expirationDate: string | null;
    externalReference: string | null;
    description: string | null;
}

interface ErrorResponse {
    code: string;
    description: string;
}

export const AsaasClient = async (client : Client, onSuccess : (data : SuccessResponse) => void, onError : (error : ErrorResponse) => void) : Promise < void > => {
    const apiKey = env.ASAAS_API_KEY;
    const url = 'https://api-sandbox.asaas.com/v3/payments';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': apiKey
            },
            body: JSON.stringify(client)
        });

        // Cast the 'any' result to our specific type
        const data = (await response.json())as SuccessResponse | {
            errors: ErrorResponse[]
        };

        if (! response.ok) {
            const errorData = data as {
                errors: ErrorResponse[]
            };
            // Using ?? ensures that if an error description is an empty string,
            // it is still treated as a valid value instead of falling back.
            return onError(errorData.errors[0] ?? {
                code: 'UNKNOWN',
                description: 'Unknown error'
            });
        }

        onSuccess(data as SuccessResponse);
    } catch (e) {
        onError({
            code: 'NETWORK_ERROR',
            description: (e instanceof Error ? e.message : null) ?? 'Connection failed'
        });
    }
}