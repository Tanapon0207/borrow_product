const express = require('express')
const cors = require('cors')
var bodyParse = require("body-parser");
const app = express()
const e = require("express");
var mongoose = require("mongoose");

const router = express.Router();

const port = 9100
app.use(cors())

app.use(express.json());
const routes = require('./route/routes');
app.use(routes);

app.use(bodyParse.json())
app.use(express.static('../AngularApp'))
app.use(bodyParse.urlencoded({
    extended: true
}));

module.exports = router;
app.use(cors(
    {
        origin: "http://localhost:4200"
    }

));





var Car = mongoose.model('Car', {
    _id: { type: Number },
    Year: { type: String },
    Month: { type: String },
    Make: { type: String },
    Quantity: { type: Number }
});

module.exports = { Car };


var Product = mongoose.model('Product', {
    _id: { type: String },
    date_buy: { type: String },
    model: { type: String },
    product_name: { type: String },
    group: { type: String },
    amount: { type: Number },
    price: { type: Number },
    status: { type: String }
});

module.exports = { Product };

var Bill = mongoose.model('Bill', {
    _id: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    date_time: { type: String },
    product_name: { type: String },
    model: { type: String },
    amount: { type: String }
   
});

module.exports = { Bill };






mongoose.connect('mongodb://127.0.0.1:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;

// check connect

db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));




const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/admin/";
const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB();


app.get('/bill', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const object = await client.db('test').collection('bills')
        .find({Billuse : "1"}).limit(100).toArray();
    
        
       
    await client.close();
    res.status(200).send(object);
   
});

app.post('/bill/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('test').collection('bills').insertOne({
        id: parseInt(object.id),
        "firstname": object.firstname,
        "lastname": object.lastname,
        "day_b": object.day_b,
        //"product_name": object.product_name,
       // "model": object.model,
       // "amount": object.amount,
        "billItems": object.billItems,
        "Billuse": "1",

        


    }).then(res => {
        console.log(res)
        object.id = res.insertedId
    });

   

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "สร้าง bill เรียบร้อยเเล้ว!!",
        "object": object
    })



  
});

app.put('/bill/delete', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('test').collection('bills').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            id: parseInt(object.id),
            "Isuse" : "0"
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Updated ข้อมูล ID = " + id + "เรียบร้อยเเล้ว!!",
        "object": object
    });
})










app.get('/product', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const object = await client.db('table_product').collection('product')
        .find({Isuse : "1"}).limit(100).toArray();
    
        
       
    await client.close();
    res.status(200).send(object);
   
});


app.post('/product/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('table_product').collection('product').insertOne({
        id: parseInt(object.id),
        "date_buy": object.date_buy,
        "product_no": object.product_no,
        "model": object.model,
        "product_name": object.product_name,
        "brand": object.brand,
        "group": object.group,
        "amount": object.amount,
        "price": object.price,
        "status": object.status,
        "Isuse": "1",


    }).then(res => {
        console.log(res)
        object.id = res.insertedId
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "สร้าง product เรียบร้อยเเล้ว!!",
        "object": object
    })



});

app.put('/product/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('table_product').collection('product').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            id: parseInt(object.id),
            "date_buy": object.date_buy,
            "product_no": object.product_no,
            "model": object.model,
            "product_name": object.product_name,
            "brand": object.brand,
            "group": object.group,
            "amount": object.amount,
            "price": object.price,
            "status": object.status
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Updated ข้อมูล ID = " + id + "เรียบร้อยเเล้ว!!",
        "object": object
    });
})


/*
// Delete API
app.put('/product/delete', async (req, res) => {
    const object = req.body;
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    
    await client.db('table_product').collection('product').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            id: parseInt(object.id),
            "Isuse": "0"
        }
    });
})
*/

app.put('/product/delete', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('table_product').collection('product').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            id: parseInt(object.id),
            "Isuse" : "0"
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Updated ข้อมูล ID = " + id + "เรียบร้อยเเล้ว!!",
        "object": object
    });
})


app.put('/product/back', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('table_product').collection('product').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            id: parseInt(object.id),
            "Isuse" : "1"
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Updated ข้อมูล ID = " + id + "เรียบร้อยเเล้ว!!",
        "object": object
    });
})







app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('table_product').collection('product').findOne({ "_id": new ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "มี ID = " + id + " อยู่ในระบบเเล้ว!!",
        "object": user
    });
})

/*
app.get('/user/username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('admin');
        const collection = db.collection('users');
        const user = await collection.findOne({ username: username });
        await client.close();

        if (user) {
            res.status(200).send({
                status: 'ok',
                user: user,
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'User not found.',
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while processing the request.',
        });
    }
});
*/





// Read All API User
app.get('/user', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('users')
        .find({}).limit(20).toArray();

    await client.close();
    res.status(200).send(objects);

})

// Create API
app.post('/user/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('users').insertOne({
        id: parseInt(object.id),
        "firstname": object.firstname,
        "lastname": object.lastname,
        "username": object.username,
        "password": object.password,
        "confirmpassword": object.confirmpassword,


    }).then(res => {
        console.log(res)
        object.id = res.insertedId
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "สร้าง ID เรียบร้อยเเล้ว!!",
        "object": object
    });
})






app.put('/user/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('users').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            id: parseInt(object.id),
            "firstname": object.firstname,
            "lastname": object.lastname,
            "username": object.username,
            "password": object.password,
            "confirmpassword": object.confirmpassword
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Updated ข้อมูล ID = " + id + "เรียบร้อยเเล้ว!!",
        "object": object
    });
})


// Delete API
app.delete('/user/delete/:id', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('users').deleteOne({ '_id': new ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "ลบข้อมูล ID = " + id + "เรียบร้อยเเล้ว"
    });
})

// ค้นหาข้อมูลตาม id  ปกติ
app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('admin').collection('users').findOne({ "_id": new ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "มี ID = " + id + " อยู่ในระบบเเล้ว!!",
        "object": user
    });
})

//ค้นหาข้อมูลตาม username ปกติ
app.get('/user/username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('admin');
        const collection = db.collection('users');
        const user = await collection.findOne({ username: username });
        await client.close();

        if (user) {
            res.status(200).send({
                status: 'ok',
                user: user,
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'User not found.',
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while processing the request.',
        });
    }
});










// Read by id API
app.get('/user/findtext/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('users').find({ $text: { $search: searchText } }).sort({ "FIELD": -1 }).limit(20).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "user": objects
    });
})

// Query by filter API: Search text from username
app.get('/user/username/:searchText', async (req, res) => {
    try {
        const { params } = req;
        const searchText = params.searchText;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('admin');
        const collection = db.collection('users');
        const objects = await collection
            .find({ username: { $regex: searchText, $options: 'i' } })
            .toArray();
        await client.close();
        res.status(200).send({
            status: 'ok',
            searchText: searchText,
            users: objects,
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while processing the request.',
        });
    }
});






////////////////////////////////////////////////////////////////////////////////////////////////////




// Read All API Car
app.get('/car', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('data_set')
        .find({}).limit(20).toArray();

    await client.close();
    res.status(200).send(objects);

})




// Create API
app.post('/car/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('data_set').insertOne({
        id: parseInt(object.id),
        "Year": object.Year,
        "Month": object.Month,
        "Make": object.Make,
        "Quantity": object.Quantity,


    }).then(res => {
        console.log(res)
        object.id = res.insertedId
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "สร้าง ID เรียบร้อยเเล้ว!!",
        "object": object
    });
})




const { ObjectId } = require('mongodb');
const { count } = require('./src/user/userModel');
app.put('/car/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('data_set').updateOne({ '_id': new ObjectId(id) }, {
        "$set": {
            "Year": object.Year,
            "Month": object.Month,
            "Make": object.Make,
            "Quantity": object.Quantity,
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Updated ข้อมูล ID = " + id + "เรียบร้อยเเล้ว!!",
        "object": object
    });
})


// Delete API
app.delete('/car/delete', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('data_set').deleteOne({ '_id': new ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "ลบข้อมูล ID = " + id + "เรียบร้อยเเล้ว"
    });
})

// Read by id API
app.get('/car/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const car = await client.db('admin').collection('data_set').findOne({ "_id": new ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "มี ID = " + id + " อยู่ในระบบเเล้ว!!",
        "object": car
    });
})



// Read by id API
app.get('/car/findtext/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('data_set').find({ $text: { $search: searchText } }).sort({ "FIELD": -1 }).limit(4378).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "car": objects
    });
})

// Query by filter API: Search text from Product Name
app.get('/car/Make/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('data_set').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).limit(4378).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})