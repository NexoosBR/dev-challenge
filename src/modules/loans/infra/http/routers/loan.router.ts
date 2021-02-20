import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'

import { LoanController } from '../controllers/loan.controller'
import { creditRequestSchema, loanParams } from '../schemas/loan.schema'

const loanRouter = Router()

loanRouter.get('/status/:id', celebrate({ [Segments.PARAMS]: loanParams }), (req, res) => { new LoanController().checkLoanStatus(req, res) })

loanRouter.post('/:id', celebrate({ [Segments.BODY]: creditRequestSchema, [Segments.PARAMS]: loanParams }), (req, res) => { new LoanController().createCreditRequest(req, res) })

loanRouter.post('/make-loan/:id?', celebrate({ [Segments.PARAMS]: loanParams }), (req, res) => { new LoanController().makeALoan(req, res) })

export { loanRouter }
