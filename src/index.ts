import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})
