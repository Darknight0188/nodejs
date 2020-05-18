var con = require('../mysql-connection');
var md5 = require('md5');

module.exports.get_register = function(req,res){
    con.query('SELECT * FROM stores', function(err,result){
        if(err) throw err;
        res.render('customer/register',{stores: result});
    })
    
}

module.exports.post_register = function(req,res){
    var errors = [];
    if(!req.body.name){
        errors.push("Name is required");
    }
    if(!req.body.password){
        errors.push("Password is required");
    }
    if(!req.body.email){
      errors.push("Email is required");
    }
    if(!req.body.phone){
        errors.push("Phone is required");
    }
    if(errors.length){
        res.render('customer/register', {
            errors: errors,
            values: req.body
        });
        return;
    }

    var values = [
        req.body.name,
        md5(req.body.password),
        req.body.email,
        req.body.phone,
        req.body.storeId
    ]

    con.query('INSERT INTO customer (name,password,email,phone,storeId) VALUES (?)',[values],function(err,result){
        if(err) throw err;
        console.log('1 record inserted');
        res.redirect('/')
    })
}

module.exports.getLogin = function(req,res){
    res.render('customer/login');
}

module.exports.postLogin = function(req,res){
    var email = req.body.email;
    var password = req.body.password

    con.query("SELECT * FROM customer WHERE email = ?",[email],function(err,result){
        if(err) throw err;
        if(result[0] === undefined || result[0].email !== email) {
            res.render('customer/login', {
                errors: [
                    'Email does not exists'
                ],
                values: req.body
            });
            return;
        }
        var hashedPassword = md5(password)

        if(result[0].password !== hashedPassword){
            res.render('customer/login', {
                errors: [
                    'Wrong password!'
                ],
                values: req.body
            });
            return;
        }
        req.session.customerId = result[0].id;
        req.session.storeId = result[0].storeId; 
        req.session.cart = {};
        console.log(req.session.customerId);
        console.log(req.session.storeId);
        res.redirect('/');
    });
}

module.exports.logout = function(req,res){
    res.clearCookie("id");
    res.redirect('/')
}