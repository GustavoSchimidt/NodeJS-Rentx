import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
 
    // Modelo da nossa estrutura de atributos
    @Entity("categories")
    class Category {
        @PrimaryColumn()
        id?: string;

        @Column()
        name: string;

        @Column()
        description: string;

        @CreateDateColumn()
        created_at: Date;

    // O constructor é uma espécie de filtro da class ao ser instanciada.
        constructor() {
            if(!this.id) {
                this.id = uuidV4(); 
            };  // Se não encontrar um id na rota, vai ser gerado um pelo "uuidV4".
        }; 
    };

    export { Category };