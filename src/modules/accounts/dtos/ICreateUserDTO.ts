
// DTO => Data transfer object, responsável por fazer a transferencia de uma class para outra.
interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    id?: string;  
    avatar?: string;
  }

  export{ICreateUserDTO}