import fs from 'fs'; 
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


// Estrutura do array
interface IImportCategory {
    name: string;
    description: string;
};

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {};

    // Responsável pela leitura
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file.path); // lendo por partes

            const categories: IImportCategory[] = []; // Array que armazenará os dados

            const parseFile = csvParse(); // recebendo as partes lidas

            stream.pipe(parseFile); // Recebendo do parseFile.on e enviando para o array

            parseFile.on("data", async (line) => { // enviando para o stream.pipe
                const [ name, description ] = line;

                categories.push({
                    name,
                    description
            });
        })

        .on("end", () => {
            fs.promises.unlink(file.path);
            resolve(categories);
        })
        
        .on("error", (err) => {
            reject(err);
        });

     });
    };

   async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);

        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(name);
            if(!existCategory) {
                await this.categoriesRepository.creat({
                    name,
                    description
                });
            };
        });
    };
};



export { ImportCategoryUseCase }; 