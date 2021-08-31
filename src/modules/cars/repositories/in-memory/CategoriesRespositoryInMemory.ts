import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";



class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }

    async list(): Promise<Category[]> {
        const list = this.categories;
        return list;  
    }

    async creat({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });
        
        this.categories.push(category);

    }

}

export { CategoriesRepositoryInMemory };


// Esse repositório é pra ser usado nos testes sem depender do banco de dados. Dessa forma será um DB Fake.