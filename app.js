const express = require ('express');
const PORT = process.env.PORT || 3052;
const connection = require ('./db');
const app = express();
const dotenv = require ('dotenv');
dotenv.config();

const Route = express.Router();
app.use(express.json()); 
app.use('/',function(req,res,next){
    res.sendStatus(404);
});

Route.post('api/orders',function(req,res,next){
    connection.execute(`INSERT INTO orders (customer_name,product,quantity,order_date,status)
        VALUES(?,?,?,?,?);`,[req.body.customer_name,req.body.product,req.body.quantity,req.body.order_date,req.body.status])
        .then(()=>{
            console.log('inserted successful!');
        }).catch((err)=>{
            console.log(err);
    });
    
});

Route.get('api/orders',function(req,res,next){
    connection.execute(`SELECT * FROM orders;`)
        .then((result)=>{
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err)=>{
            console.log(err);
    });
    
});


Route.put('api/orders:uid',function(req,res,next){
    connection.execute(`UPDATE orders SET customer_name=?,product=?,quantity=?,order_date=?,status=?;`,
        [req.body.customer_name,req.body.product,req.body.quantity,req.body.order_date,req.body.status,req.params.uid])
        .then(()=>{
            console.log('updated successful!');
        }).catch((err)=>{
            console.log(err);
    });
    
});

Route.delete('api/orders:uid',function(req,res,next){
    connection.execute(`DELETE FROM orders WHERE id=?;`,[req.params.uid])
        .then(()=>{
            console.log('deleted successful!');
        }).catch((err)=>{
            console.log(err);
    });
    
});
app.listen(PORT,()=> console.log('server running on port:' +PORT));