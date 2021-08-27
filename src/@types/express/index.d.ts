declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}

// Criando uma typagem, sobreescrevendo o express, do user pois estava dando erro ao passar o usuário autenticado pro request.