import { getRepository, Repository } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

    
class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>; //Faz com que passe os métodos do repository apenas internamente

    // Responsável por modelar os atributos.
    constructor() {
        this.repository = getRepository(Category)
    }; 

    // A função creat está responsável por cadastrar a categoria no array. 
      async creat({ description, name } : ICreateCategoryDTO): Promise<void> { 

            const category = this.repository.create({
                description,
                name,
            }) // Está criando a nossa entidade para poder salvar

            await this.repository.save(category) // Irá salvar os atributos
        };
    
    // O list irá listar as categorias de dentro do array.
   async list(): Promise<Category[]> {
      const categories = await this.repository.find(); // Criando uma lista
      
      return categories;
    };

    // Verificando se existe categorias com o mesmo name dentro do array.
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name }) // Selecione todas as categories onde o nome for igual e com um limete = 1.

        return category;
    }
}

export { CategoriesRepository };