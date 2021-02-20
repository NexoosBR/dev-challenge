export interface ICreateCompanyRequestDTO {
    companyName: string
    cnpj: string
    fullAddress: {
        address: string
        number: number
        complement?: string
        cep: string
        neighborhood: string
        city: string
        state: string
    }[]
    telephone: {
        telephoneNumber: string
    }[]
}
