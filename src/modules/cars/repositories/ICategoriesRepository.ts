// Aqui será o contrato, a interface.

import { Category } from "../infra/typeorm/entities/Category";

// DTO => Data transfer object, responsável por fazer a transferencia de uma class para outra.
interface ICreateCategoryDTO {
    name: string;
    description: string;
};

interface ICategoriesRepository {
    findByName(name:string): Promise<Category>;
    list(): Promise<Category[]>;
    creat({name, description}: ICreateCategoryDTO): Promise<void>;
};

export { ICategoriesRepository, ICreateCategoryDTO };