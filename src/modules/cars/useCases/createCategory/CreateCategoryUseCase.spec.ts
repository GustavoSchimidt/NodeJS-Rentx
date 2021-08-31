import { AppError } from "@shared/errors/appError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRespositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    }) // Instanciando 

    it("should be able to create a new category",async () => {
        const category = {
            name: "Category create test",
            description: "Category description test",
        } // recebendo o name e description

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        }); // Criando a categoria

        const categoryCreate = await categoriesRepositoryInMemory.findByName(category.name); // Verificando se a categoria foi salva no DB fake


    expect(categoryCreate).toHaveProperty("id");
    });
    
    it("should not be able to create a new category with name exists",async () => {
        expect( async () => {
            const category = {
                name: "Category create test", 
                description: "Category description test",
            };
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
             
    })
})   