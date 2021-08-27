import fs from "fs";

export const deleteFile = async(filename: string) => {


    try {
        await fs.promises.stat(filename); // Verificando se existe o arquivo 
    } catch {
        return;
    }
    await fs.promises.unlink(filename); // Responsável por remover o arquivo
};