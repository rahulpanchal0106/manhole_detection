require('dotenv').config()
const http = require('http');
const app = require('./app')
const server = http.createServer(app);
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

mongoose.connection.once('connected',()=>{
    console.log('database connected!')
})
mongoose.connection.on('error',(e)=>{
    console.error('database connection error\n',e)
})

async function start_server(){
    try{
        await mongoose.connect(MONGOURI);
        

        server.listen(PORT,()=>{
            console.log(`server live ${PORT}`);
        })
    }catch(err){
        console.error('server start error\n',err)
    }
}

start_server()