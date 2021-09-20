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

let currentId: number = 1

const tasks: Task[] = []

app.get('/me', (req,res) => {
  return res.json({ name: 'Patthaveekarn Khaekai', code: '630612103'})
})

app.post('/todo', (req: Request<{}, {}, Task>, res) => {
  if(typeof(req.body.name) != "string" || req.body.name === "" || typeof(req.body.complete) != "boolean"){
    return res.status(400).json({ status: 'failed', message: 'Invalid input data' })
  }else{
    const newTask: Task = {
      id: currentId,
      name: req.body.name,
      complete: req.body.complete
    }
    tasks.push(newTask)
    currentId += 1
  
    return res.json({ status: 'success', tasks: tasks })
  }
})

app.get('/todo', (req, res) => {
  if(req.query.order == "asc") {
    tasks.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
  })
  }else if(req.query.order == "desc"){
    tasks.sort(function(a, b){
      if(a.name > b.name) { return -1; }
      if(a.name < b.name) { return 1; }
      return 0;
  })
  }
  return res.json({ status: 'success', tasks })
})

app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id)
	const markingTask = tasks.find(x => x.id === id)
	if (markingTask) {
		markingTask.complete = !markingTask.complete
		return res.json({ status: 'success', task: markingTask })
	} else {
		return res.status(404).json({
			status: 'failed',
			message: 'Id is not found'
		})
	}
})

app.delete('/todo/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const foundIndex = tasks.findIndex(x => x.id === id)
	if (foundIndex > -1){
		tasks.splice(foundIndex, 1)
		return res.json({status: 'success', tasks}) 
	}
	else{
		return res.status(404).json({
			status: 'failed',
			message: 'Id is not found'
		})
	}
})


//Heroku will set process.env.PORT to server port
//But if this code run locally, port will be 3000
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server is running at port' + port)
})