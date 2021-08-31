export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message:string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Nesse arquivo, o algoritmo faz com seja possível passar um statusCode para o error, pois com o "throw new Error()" era só possível passar a message. 