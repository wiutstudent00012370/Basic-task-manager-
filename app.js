
//third party libs

const express =  require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app =  express()
//node libs
const fs = require('fs')

const PORT = 4050
//letPORT = process.env.PORT || 8000

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))


//http://localhost:4050
app.get('/', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if(err) throw err

        const todos = JSON.parse(data)

        res.render('home', { todos: todos})
    })

})

app.post('/add', (req, res) => {
    const formData = req.body

    if (formData.todo.trim() == '') {

        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)
            res.render('home', { error: true, todos: todos })
        })
        
    } else {
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)


            const todo = {
                id: id(),
                description: formData.todo,
                done: false
            }
            todos.push(todo)

            fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err

                fs.readFile('./data/todos.json', (err, data) => {
                    if (err) throw err

                    const todos = JSON.parse(data)
                    res.render('home', { success: true, todos: todos })
                })

                
            })
        })

    }
})



app.listen(PORT, (err) => {
    if (err) throw err

    console.log(`This app is rinning on port ${PORT}`)
})



function id () {
    return '_' + Math.random().toString(36).substring(2, 9);
  }