import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";
import axios from "axios";

const app=express();
const port=3000;


const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"postgres",
    password:"database",
    port:5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/",async(req,res)=>{
    try{ 
        const row= await db.query("Select * from books order by id asc");
        let items=row.rows;
        // const isbn=req.body.isbn;
        const response = await axios.get(`https://covers.openlibrary.org/b/id/12547191-L.jpg`);
        const result=response.data;  
        // console.log(result);
        res.render("index.ejs",{
            books:items,
        });
    }catch(err){
        console.log(err);
    }
});
app.get("/body",(req,res)=>{
    res.render("body.ejs");
})
app.post("/",(req,res)=>{
    let items=row.rows;
        const isbn=req.body.isbn;
    res.render("index.ejs",{
        img:isbn
    });
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});