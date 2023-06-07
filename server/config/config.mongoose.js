const mongoose=require ('mongoose')

module.exports=(DB_name)=>{
    mongoose.connect(`mongodb://127.0.0.1:27017/${DB_name}`,{
     useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>console.log(`connected to ${DB_name}`))
    .catch(error=>console.log(` CANNOT connect to ${DB_name}, error`))
}