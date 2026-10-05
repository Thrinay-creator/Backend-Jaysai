const express=require("express");
const productsRoutes = require("./routes/products");
const app=express();
const port=3000;

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use("/products", productsRoutes)

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})



app.listen(port,()=>{
        console.log("server listening on port"+port);
});