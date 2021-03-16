const express=require('express')
const request=require('request')
const app=express()
//Middlewares
app.set("view engine", "ejs")
app.use('/public', express.static('public'))
/*
Routing
*/
app.get('/', (req, res)=>{
    //res.send('Home page from akshay')
    res.render("home")
})
app.get('/dummy', (req, res)=>{
    //res.send('Home page from akshay')
    res.render("dummy")
})
app.get('/result', (req, res)=>{
    //console.log(req)
    console.log(req.query)
    //res.send(`You searched for ${req.query.movieName}`)
    const url=`http://www.omdbapi.com/?apikey=cfd672ef&s=${req.query.movieName}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            //res.send(data)
            res.render('result', {moviesDump: data})
        }else{
            res.send('Something went wrong')
        }
    })
})
app.get('/result/:id', (req, res)=>{
    const url=`http://www.omdbapi.com/?apikey=cfd672ef&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            //res.send(data)
            res.render('detail', {data: data})
        }else{
            res.send('Something went wrong')
        }
    })
})
app.get('*', (req, res)=>{
    res.send('404 not found')
})
app.listen(3000, ()=>{
    console.log("Server has started")
})