const express = require('express');
const hbs = require('hbs');
const {
    join
} = require('path');
const {
    readFile,
    appendFile
} = require('fs')
const {
    platform,
    arch,
    cpus
} = require('os')
const app = express();
hbs.registerPartials(join(__dirname,'views/partials'));
hbs.registerHelper('uppercase' , (text)=>{
    return text.toUpperCase();
});
hbs.registerHelper('date',()=>{
    return new Date().getFullYear()
});

app.use((req, res, next) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const log = `Month : ${months[new Date().getMonth()]} ** URL : ${req.url} ** Method : ${req.method} \n`;
    appendFile('Server.log',log,(err)=>{
        if(err){
            console.log(err)
        }
    })
    next();
});
let ReadF = (callBack)=>{
    readFile(join(__dirname,'public/file.txt'),(err,data)=>{
        // console.log(data.toString())
        callBack(data.toString())
    });
}
app.set('view engine' , 'hbs');
app.use(express.static(join(__dirname,'public')));
ReadF((data)=>{
    app.get('/', (req, res) => { 
        res.render('home',{
            pageT:'HomePage',
            article:data,
            title:'Mak.Com'
        })
    });
    app.get('/mak', (req, res) => { 
        res.render('mak',{
            pageT:'MAK',
            article:data,
            title:'Mak.Com'
        })
    });
})

app.listen(8080, () => {
    console.log('app is running')
})