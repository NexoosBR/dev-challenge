interface IAddressDTO {
  id?: string
  zipCode: string
  address: string
  addressNumber: number
  complement?: string
  district: string
  city: string
  state: string
  client?: string
  created?: Date
  updated?: Date
  version?: number
}

export { IAddressDTO }
