import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './importCategoryUseCase';


class ImporCategoryController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;;
     
        const importCAtegoryUseCase = container.resolve(ImportCategoryUseCase)

        await importCAtegoryUseCase.execute(file);

        return response.status(201).send();
    };
};


export { ImporCategoryController };