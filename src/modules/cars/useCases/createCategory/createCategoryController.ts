import { Response, Request} from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { container } from 'tsyringe'

class CreateCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body; // Recebendo a requisição

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase); // Injeção de dependencia

        await createCategoryUseCase.execute({ name, description }); // Executando o service
    
        return response.status(201).send();
    };
};

export { CreateCategoryController };