import dotenv from 'dotenv'

import { createConnection, getConnection, QueryRunner } from 'typeorm'
import { CompanyAddressModel } from '../../../../models/company-address.model'
import { CompanyTelephoneModel } from '../../../../models/company-telephone.model'
import { CompanyModel } from '../../../../models/company.model'
import { CreditRequestModel } from '../../../../models/credit-request.model'
import { InstallmentModel } from '../../../../models/installment.model'
import { LoanModel } from '../../../../models/loan.model'
import { IDatabase } from '../i-database'
dotenv.config()

export class TypeORMDataBaseSQL implements IDatabase {
  private queryRunnerForTransaction: QueryRunner

  private entities = [
    CompanyModel,
    CompanyAddressModel,
    CompanyTelephoneModel,
    CreditRequestModel,
    LoanModel,
    InstallmentModel
  ]

  connectDB = async (): Promise<void> => {
    await createConnection({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: 3306,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: this.entities,
      synchronize: false,
      logging: false,
      cache: {
        duration: 100000 // 1 min
      }
    })

    console.log('Successfully connected to Database')
  }

  disconnectDB = async (comTransaction = false): Promise<void> => {
    if (comTransaction) await this.queryRunnerForTransaction.rollbackTransaction()

    await this.queryRunnerForTransaction.release()

    await getConnection().close()
  }
}
