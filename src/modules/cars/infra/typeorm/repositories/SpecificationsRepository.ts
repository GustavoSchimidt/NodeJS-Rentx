import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";




class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }
; // O constructor aplica a estrutura criado em "model"

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    };

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        });
        return specification;
    }

};


export { SpecificationRepository };