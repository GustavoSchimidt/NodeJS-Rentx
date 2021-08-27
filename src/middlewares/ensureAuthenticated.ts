import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/appError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request:Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Coletando dados do header

    if (!authHeader) {
        throw new AppError("Token missing", 401) // Verificando se está recebendo o token
    }

     /**
     * Os dados vindo do header são assim: "Bearer 994fhg49h4gf9h9fs"
     * Com o split, irá apenas pegar o que importa pra gente no momento, o "994fhg49h4gf9h9fs". Ficará assim:
     * [0] = Bearer 
     * [1] = 994fhg49h4gf9h9fs (token)
     */
    const [, token] = authHeader.split(" ")

    // Verificando se o token é válido
    try {
        const { sub: user_id } = verify(token, "1818697b0cb63206bb1e426fd424fc97") as IPayload; // Esses números e letras aleatorios são da chave "secreta" que criamos em MD5 e colocamos no UseCase

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id) // Verificando se o user existe
        if (!user) {
            throw new AppError("User does not exist", 401)
        }

        // Enviando o usuário autenticado para o request
        request.user = {
            id: user_id,
        }

        next();

    } catch {
        throw new AppError("Invalid token", 401);
    }
}