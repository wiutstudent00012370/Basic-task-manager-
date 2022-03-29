const express =  require('express')
const app =  express()

const PORT = 8000

app.set('view engine', 'pug')


app.get('/', (req, res) => {
    res.render('HOME')
})



app.listen(PORT, (err) => {
    if (err) throw err

    console.log(`This app is rinning on port ${PORT}`)
})
