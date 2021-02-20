import { CompanyAddressModel } from '../../models/company-address.model'
import { CompanyTelephoneModel } from '../../models/company-telephone.model'
import { CompanyModel } from '../../models/company.model'

export interface CompanyWithAddressAndTelephone {
    company: CompanyModel
    address: CompanyAddressModel[]
    telephone: CompanyTelephoneModel[]
}

export interface FormattedLoan {
    loadId: string
    loanValue: string
    finalValue: string
    interestRate: string
    numberOfInstallments: number
    installmentValue: string
}

export interface FormattedInstallment {
    installmentId: string
    dueDate: string
    status: string
}
