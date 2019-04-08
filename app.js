const express = require('express')
const expressHandlebars = require('express-handlebars')
// const data = require('./dummy-data.js')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const bcrypt = require('bcryptjs')
const db = require('./db')
const jsonwebtoken = require('jsonwebtoken')



const app = express()

// Setup middlewares.
app.use(express.static("public"))

app.use(expressSession({
	resave: false,
	saveUninitialized: false,
	secret: "sdfjhdkjfhsdkjfhsk"
}))

app.use(function(request, response, next){
	response.locals.account = request.session.account
	next()
})

app.use(bodyParser.urlencoded({
    extended: false
}))



app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs',
}))

app.get('/', function(request, response) {
    response.render("home.hbs")
})

app.get('/about', function(request, response) {
    response.render("about.hbs")
})

app.get('/contact', function(request, response) {
    response.render("contact.hbs")
})

app.get('/sign_in', function(request, response) {
    response.render("sign_in.hbs")
})

app.get('/sign_up', function(request, response) {

    const model = {
        username:"",
        errors:[]
    }
    response.render("sign_up.hbs")
})

app.post('/sign_up', function(request, response) {
    const username = request.body.username
    const password = request.body.password
    const born = request.body.born
    const city = request.body.city

    const errors = []   

    if(username.length < 3){
		errors.push("Username too short.")
	}else if(15 < username.length){
		errors.push("Username too long.")
    }
    
    if(0 < errors.length){
		
		const model = {
			username: username,
			errors: errors
        }
        response.render("sign_up.hbs", model)
}else{

    bcrypt.hash(request.body.password, 10, function(err, hash) {
       
    

    db.createAccount(username, hash, born, city, function(errors, id){

        if(0 < errors.length){

            const model = {
                username: username,
                errors: errors
            }
            response.render("sign_up.hbs", model)
        }else{
            response.redirect("/accounts")
        }
    })
})
}

})

app.get("sign_in", function(request, response){

    const model = {
        username: "",
        errors: []
    }

    response.render("sign_in.hbs", model)
})

app.post("/sign_in", function(request, response){

    const username = request.body.username
    const password = request.body.password

    db.getAccountByUsername(username, function(errors, account){

        if(0 < errors.length){

            const model = {
                username: username,
                errors: errors
            }

            response.render("sign_in.hbs", model)

        }else if(account == null){

            const model = {
                username: username,
                errors: ["wrong username"]
            }

            response.render("sign_in.hbs", model)

        }else{

            bcrypt.compare(request.body.password, account.password, function(err, res){
                if(res == false){
                    const model ={
                                username: username,
                                errors: ["wrong password"]
                            }
                    response.render("sign_in.hbs", model)

                }else{
                    request.session.account = account
                    response.redirect("/accounts")
                }
            })
        
        // if(account.password !=password){
            
        //     const model ={
        //         username: username,
        //         errors: ["wrong password"]
        //     }
        //     response.render("sign_in.hbs", model)

        // }else{

        //     request.session.account = account
        //     response.redirect("/accounts")
        // }
        }
    })
})



app.get('/accounts', function(request, response) {

    db.getAllAccounts(function(errors,accounts){

        const model = {
            errors: errors,
            accounts: accounts
            }
           
        response.render("accounts.hbs", model)
    })
        
})



app.get("/accounts/sign-out", function(request, response){
	request.session.account = null
    response.redirect("/")
})

app.get('/accounts/:id', function(request, response){
    const id = request.params.id
    
    db.getAccountById(id, function(errors, account){

        if(0 < errors.length){

            const model = {
                errors: errors,
                account: account,
                datas: []
            }

            response.render("view-data.hbs", model)

        }else if(request.session.account){

            if(account.id == request.session.account.id){

            db.getAllDatasByAccountId(id, function(errors, datas){

                const model = {
                    errors: errors,
                    account: account,
                    datas: datas
                }

                response.render("view-data.hbs", model)
            })
        }else {
            response.redirect("/sign_in")
        }
                
        
        }else{
            response.redirect("/sign_in")

    }
    })

})

app.get("/add/data", function(request, response){
    response.render("add-data.hbs")
})

// app.get("/add/weight", function(request, response){
//     response.render("add-weight.hbs")
// })

app.post("/add/data", function(request, response){
    const start = request.body.start
    const stop = request.body.stop
    const description = request.body.description
    const time = request.body.time
    const weight = request.body.weight
    const accountId = request.session.account.id

    const errors = []
    if(start.length == 0 || stop.length == 0 || description.length == 0 || time.length == 0 || weight.length == 0){
        errors.push("Please input every data")
    }
    // }else if(stop.length == 0){
    //     errors.push("Please input the stop data")
    // }else if(description.length == 0){
    //     errors.push("Please input the description data")
    // }else if(time.length == 0){
    //     errors.push("Please input the time data")
    // }else if(weight.length == 0){
    //     errors.push("Please input the weight data")
    // }
    
    if(0 < errors.length){

        const model = {
            start: start,
            stop: stop,
            errors: errors
        }

        response.render("add-data.hbs", model)

    }else if(request.session.account){
        

        db.createData(start, stop, description, time, weight, accountId, function(errors, id){
            response.redirect("/accounts/"+ accountId)
        })

    }else{
        response.redirect("/sign_in")
    }
})

// app.post("/add/weight", function(request, response){

//     if(request.session.account){
//         const time = request.body.time
//         const weight = request.body.weight
//         const accountId = request.session.account.id

//         db.createWeight(time, weight, accountId, function(errors, id){
//             response.redirect("/accounts/"+ accountId)
//         })

//     }else{
//         response.redirect("/sign_in")
//     }
// })


app.listen(8888)