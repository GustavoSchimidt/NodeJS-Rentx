import { inject, injectable } from 'tsyringe';

import { AppError } from "@errors/appError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

// Recebendo o name e a description:
interface IRequest {
    name: string;
    description: string;
};


/**
 * [X] - Definir o tipo de retorno;
 * [X] - Alterar o retorno de erro;
 * [X] - Acessar o repositório.
 */

@injectable()
class CreateCategoryUseCase {
    
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {}; // Responsável por instanciar

    async execute({description, name} : IRequest): Promise<void>{
        
        // Verificando se o name existe
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists) {
        throw new AppError("Category Already Exists!");
    };

    // Caso a categoria não exista, o creat entra em ação para criar uma nova acessando o repositório
    this.categoriesRepository.creat({name, description});
    };
};


export { CreateCategoryUseCase };