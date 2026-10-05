const express=require("express");
const app=express.Router();

let products =[
    {
        id: 1,
        name: "laptop",
        price:10000
    },
    {
        id: 2,
        name: "Phone",
        price:1000
    },
    {
        id: 3,
        name: "tv",
        price:10000
    }
];
app.get("/products",(req,res)=>{
    res.send(products);
})

app.get("/products/:id",(req,res)=>{
    const id=req.params.id;
    const product=products.find((p)=> p.id === Number(id));
    if(!product){
        return res.status(404).json({
            message:"products not found"
        });
    }
    res.status(200).json({
        name:product.name,
        price:product.price
    })
});
app.post("/products",(req,res)=>{
    const{name,price}=req.body;
    if(!name ){
       return  res.status(400).json({
            message: "name is  required"
        })
    }
    if(!price ){
      return   res.status(400).json({
            message: "price is  required"
        })
    }
    const product={id:Date.now(),name,price};
    products.push(product)
    res.status(201).json(product);

})
app.put("/products/:id",(req,res)=>{
    const id=req.params.id;
    const product=products.find((p) => p.id === Number(id));
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    product.name=req.body.name ?? product.name;
    product.price=req.body.price ?? product.price;
    res.status(200).json(product);
});
app.delete("/products/:id",(req,res)=>{
    const id=req.params.id;
    products=products.filter((p)=>p.id != Number(id));
    res.status(200).json({
        message : "product Deleted Successfully"
    })
});
module.exports = app;