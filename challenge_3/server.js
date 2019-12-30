const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static(`${__dirname}/public`));

app.listen(5000, () => {
  console.log(`Server Running on http://localhost:5000`);
});


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'startdb'
  });
   connection.connect((err) => {
      if (err) throw err;
      else console.log('Connected!');
  })

const Sequelize = require('sequelize');
const sequelize = new Sequelize('checkout', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql'
  });
 const Checkout = sequelize.define('checkout', {}, {freezeTableName: true, timestamps: false});

const Person = sequelize.define('person', {
    checkout_id: {
        type: Sequelize.INTEGER,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {freezeTableName: true, timestamps: false});

const Address = sequelize.define('address', {
    checkout_id: {
        type: Sequelize.INTEGER,
    },
    line1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    line2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: true
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {freezeTableName: true, timestamps: false});

const Payment = sequelize.define('payment', {
    checkout_id: {
        type: Sequelize.INTEGER,
    },
    credit_card_number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    exp_date: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cvv: {
        type: Sequelize.STRING,
        allowNull: true
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {freezeTableName: true, timestamps: false});


// app.use(express.json({ extended: true }));
// app.use(express.urlencoded({ extended: true }));


// app.get('/checkout', (res, next) => {
//    Checkout.create()
//     .then(checkout => {
//         res.send(checkout.dataValues.id);
//         next();
//     });
// });

app.post('/person', (req, res, next) => {
    Person.create({
        checkout_id: req.body.checkoutId,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        res.end();
        next();
    })
});

app.post('/address', (req, res, next) => {
    Address.create({
        checkout_id: req.body.checkoutId,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }).then(() => {
        res.end();
        next();
    })
})

app.post('/payment', (req, res, next) => {
    Payment.create({
        checkout_id: req.body.checkoutId,
        credit_card_number: req.body.creditCardNumber,
        exp_date: req.body.expiration,
        cvv: req.body.cvv,
        zip: req.body.zip,
    }).then(() => {
        res.end();
        next(); 
    })
});

app.get('/results', (req, res, next) => {
    sequelize.query("SELECT * FROM person INNER JOIN payment ON (payment.checkout_id = person.checkout_id) INNER JOIN address ON (address.checkout_id = person.checkout_id) WHERE person.checkout_id = ?", 
        { replacements: [req.headers.id], type: sequelize.QueryTypes.SELECT })
    .then(data => {
        res.send(data);
        next();
    })
    next();
});

// app.listen(5000, function () {
//     console.log('Ready')
// });



