const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');
const app=express();
app.use(cors());
app.use(express.json());
// database 
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root@2005',
    database:'todo'
})
db.connect((error) =>{
    if(error){
        console.log('Error is getting in connection of database mysql')
    return
    }
    console.log('Mysql is connected')
})
// routes and api calls
app.get('/',(request,response) =>{
    console.log('Default routes')
    db.query(`select * from todoItems`, (error,result) =>{
        if(error){
            console.log('error occured',error)
            return
        }
       console.log('Data: ',result)
       response.send(result)
    })
})
// delete api
app.delete('/delete-item/:id', (req, res) => {
    const id = req.params.id;
  db.query(
  `DELETE FROM todoItems WHERE ID = ${id}`,
  (error, result) => {
    if (error) {
      console.log('Delete error', error);
      return res.status(500).send('Error deleting item');
    }
    res.send('deleted');
  }
);

});
app.post('/add-item',(request,response) =>{
    console.log(request.body)
    db.query(`insert into todoItems(itemDescription) values('${request.body.text}')`, (error, result) => {
        if(error){
            console.log('error occured')
            return
        }
       console.log('Created Successfully')
    
    })
    response.send('added-successfully')
})
app.put('/edit-item', (request, response) => {
    console.log('Line 54 ',request.body);
     db.query(`update todoitems set itemDescription='${request.body.itemDescription}' where ID=${request.body.ID};`, (error, result) => {
          if (error) {
        console.log("Error occured", error)
        return
      }
      console.log("Updated Successfully")
    }
  )
  response.send('success')
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
