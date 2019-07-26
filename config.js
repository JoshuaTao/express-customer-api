module.exports={
    PORT:process.env.PORT||5000,
    MONGODB_URI:'mongodb+srv://stefan:<PASSWORD>@mk-zffqn.mongodb.net/express_customer_api?retryWrites=true&w=majority',
    JWT_SECRET:process.env.JWT_SECRET||'MYSECRET'
}