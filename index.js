const express = require('express')
const app = express()
const cors = require('cors')
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbojs1n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
       const doctorAppointmentCollection = client.db('doctorAppointment').collection('appointmentOption')
       const doctorAppointmentBookingCollection = client.db('doctorAppointment').collection('bookings')

       app.get('/appointmentOptions', async(req, res)=>{
        const query = {}
        const options = await doctorAppointmentCollection.find(query).toArray();
        res.send(options)
       })


       app.post('/bookings', async(req, res)=>{
        const booking = req.body
        const result = await doctorAppointmentBookingCollection.insertOne(booking)
        res.send(result)
       })
    }
    finally{

    }
}
run().catch(console.log)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})