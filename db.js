const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("the-database.db")

db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
		born INTEGER,
		city STRING
    )
`)

db.run(`
	CREATE TABLE IF NOT EXISTS datas (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		start INTEGER,
		stop INTEGER,
		description TEXT,
		time INTEGER,
		weight INTEGER,
		accountId INTEGER
	)
`)

// db.run(`
// 	CREATE TABLE IF NOT EXISTS weights (
// 		id INTEGER PRIMARY KEY AUTOINCREMENT,
// 		time INTEGER,
// 		weight INTEGER,
// 		accountId INTEGER
// 	)
// `)

exports.getAllAccounts = function(callback){
	
	const query = "SELECT * FROM accounts"
	const values = []
	
	db.all(query, values, function(error, accounts){
		if(error){
			callback(["Database error"])
		}else{
			callback([], accounts)
		}
	})
	
}

exports.createAccount = function(username, password, born, city, callback){
	
	const query = `
		INSERT INTO accounts (username, password, born, city) VALUES (?, ?, ?, ?)
	`
	const values = [username, password, born, city]
	
	db.run(query, values, function(error){
		if(error){
			if(error.message == "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.username"){
				callback(["Username taken"])
			}else{
				callback(["Database error"])
			}
		}else{
			callback([], this.lastID)
		}
	})
	
}

exports.getAccountByUsername = function(username, callback){
	
	const query = "SELECT * FROM accounts WHERE username = ?"
	const values = [username]
	
	db.get(query, values, function(error, account){
		if(error){
			callback(["Database error"])
		}else{
			callback([], account)
		}
	})
	
}

exports.getAccountById = function(id, callback){
	
	const query = "SELECT * FROM accounts WHERE id = ?"
	const values = [id]
	
	db.get(query, values, function(error, account){
		if(error){
			callback(["Database error"])
		}else{
			callback([], account)
		}
	})
	
}

exports.createData = function(start, stop, description, time, weight, accountId, callback){

	const query = `
		INSERT INTO datas (start, stop, description, time, weight, accountId) VALUES (?, ?, ?, ?, ?, ?)
	`
	const values = [start, stop, description, time, weight, accountId]

	db.run(query, values, function(error){
		if(error){
			callback(["Database Error"])
		}else{
			callback([], this.lastID)
		}
	})
}

// exports.createWeight = function(time, weight, accountId, callback){

// 	const query = `
// 		INSERT INTO weights (time, weight, accountId) VALUES (?,?,?)
// 	`
// 	const values = [time, weight, accountId]

// 	db.run(query, values, function(error){
// 		if(error){
// 			callback(["Database Error"])
// 		}else{
// 			callback([], this.lastID)
// 		}
// 	})
// }

exports.getAllDatasByAccountId = function(accountId, callback){

	const query = "SELECT * FROM datas WHERE accountId = ?"
	const values = [accountId]

	db.all(query, values, function(error, posts){
		if(error){
			callback(["Database error"])
		}else{
			callback([], posts)
		}
	})
}

// exports.getAllWeightsByAccountId = function(accountId, callback){

// 	const query = "SELECT * FROM trainings WHERE accountId = ?"
// 	const values = [accountId]

// 	db.all(query, values, function(error, posts){
// 		if(error){
// 			callback(["Database error"])
// 		}else{
// 			callback([], posts)
// 		}
// 	})
// }

exports.getTokens = function(username, callback){

	const query = "SELECT * FROM accounts WHERE username = ?"
	const values = [username]
	
	db.get(query, values, function(error, account){
		if(error){
			callback(["Database error"])
		}else{
			callback([], account)
		}
	})
}