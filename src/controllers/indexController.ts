import { type Request, type Response } from 'express'

const indexController = (_req: Request, res: Response): void => {
  res.status(200).send('TS App is Running and OK')
}

export default indexController
