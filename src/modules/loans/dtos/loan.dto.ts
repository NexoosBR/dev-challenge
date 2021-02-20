interface ILoanDTO {
  id?: string;
  creditRequestValue: string
  status?: string
  installments?: number
  interestRate?: number
  loanValue?: string

  client?: string;

  created?: Date
  updated?: Date
  version?: number
}

export { ILoanDTO }
