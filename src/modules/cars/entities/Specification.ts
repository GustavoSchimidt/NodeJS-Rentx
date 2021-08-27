import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

// Modelo da nossa estrutura de atributos
@Entity("specifications")
class Specification {
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



export { Specification };