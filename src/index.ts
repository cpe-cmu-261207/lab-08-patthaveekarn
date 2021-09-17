import express, { Request } from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

type Task = {
  id: number;
  name: string;
  complete: boolean;
}

const tasks: Task[] = []

app.get('/todo', (req, res) => {

  // try to call /todo?q1=data1&q2data2
  // you can read query parameters with "req.query"
  console.log(req.query)
  console.log('hello')
 
  return res.json({ status: 'success', tasks })
})


//Heroku will set process.env.PORT to server port
//But if this code run locally, port will be 3000
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server is running at port' + port)
})