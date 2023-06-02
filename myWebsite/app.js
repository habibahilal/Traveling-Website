var express = require('express');
var fs = require('fs');
var path = require('path');
var session = require ('express-session');
var mongoDBSession = require('connect-mongodb-session')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const store = new mongoDBSession({
  uri: 'mongodb://127.0.0.1:27017/myDB',
  collection: 'Sessions'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret', saveUninitialized: false, resave: false, store: store, cookie: {maxAge: 1000 * 60 * 60}}));


var MongoClient = require('mongodb').MongoClient;


function getAllSubstrings(str) {
  var i, j, result = [];

  for (i = 0; i < str.length; i++) {
      for (j = i + 1; j < str.length + 1; j++) {
          result.push(str.slice(i, j));
      }
  }
  return result;
}

var baliSub = getAllSubstrings("bali");
var romeSub = getAllSubstrings("rome");
var annapurnaSub = getAllSubstrings("annapurna");
var incaSub = getAllSubstrings("inca");
var parisSub = getAllSubstrings("paris");
var santoriniSub = getAllSubstrings("santorini");

app.get('/', function(req,res){
  res.render('login', {helper2})
});

app.get('/login', function(req,res){
  res.render('login', {helper2})
});

var helper2=[];
app.post('/login', function(req,res){
  var x = req.body.username;
  var y = req.body.password;

  MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
  if(err) throw err;
  var db = client.db('myDB');
  var loggedIn=0;
  db.collection('myCollection').find().toArray(function (err, results){
    for (let i = 0; i < results.length; i++) { 
      var object1 = results[i];
      if((object1.username==x && object1.password==y)){
        loggedIn=1;
        req.session.Authentication=true;
        req.session.username=x;
        res.render('home');}
      }

      if(loggedIn==0){
        helper2.push({title: 'login'});
        res.render('login', {helper2});;}
        helper2=[];
        
       })

})
})

app.get('/registration', function(req,res){
  res.render('registration',{helper})
});

var helper=[];
app.post('/register', function(req,res){
  var x = req.body.username;
  var y = req.body.password;
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
  if(err) throw err;
  var db = client.db('myDB');
  var itExists=0;
  db.collection('myCollection').find().toArray(function (err, results){
    for (let i = 0; i < results.length; i++) { 
      var object1 = results[i];
      if(object1.username==x){
        helper.push('failed');
        res.render('registration', {helper});
        itExists=1;}}

      if(x=='' || y==''){
          helper.push('failed');
          res.render('registration', {helper});
          itExists=1;}
          helper=[];

      if(itExists==0){
            helper2.push({title: 'register'});
            db.collection('myCollection').insertOne({username: x, password: y, wantTogo: []});
            res.render('login', {helper2});}
            helper2=[];
        
       })

});
});


app.get('/home', function(req,res){
  if(req.session.Authentication){
    res.render('home');}
});

app.get('/hiking', function(req,res){
  if(req.session.Authentication){
  res.render('hiking')}
});

app.get('/cities', function(req,res){
  if(req.session.Authentication){
  res.render('cities')}
});

app.get('/islands', function(req,res){
  if(req.session.Authentication){
  res.render('islands')}
});

app.get('/santorini', function(req,res){
  if(req.session.Authentication){
  res.render('santorini', {helper3})}
});

app.get('/rome', function(req,res){
  if(req.session.Authentication){
  res.render('rome', {helper3})}
});


var helper3= [];
app.get('/paris', function(req,res){
  if(req.session.Authentication){
  res.render('paris', {helper3})}
});

app.get('/inca', function(req,res){
  if(req.session.Authentication){
  res.render('inca', {helper3})}
});

app.get('/bali', function(req,res){
  if(req.session.Authentication){
  res.render('bali', {helper3})}
});

app.get('/annapurna', function(req,res){
  if(req.session.Authentication){
  res.render('annapurna', {helper3})}
});

app.get('/searchresults', function(req,res){
  if(req.session.Authentication ){
  res.render('searchresults');}
});

var outPut=[];
app.post('/search', function(req,res){
  if(req.session.Authentication){
  var x= req.body.Search;
  if(baliSub.includes(x.toLowerCase())){
    outPut.push( {title: 'bali'});
  }
  if(romeSub.includes(x.toLowerCase())){
    outPut.push( {title: 'rome'});
  }
  if(annapurnaSub.includes(x.toLowerCase())){
    outPut.push( {title: 'annapurna'});
  }
  if(incaSub.includes(x.toLowerCase())){
    outPut.push( {title: 'inca'});
  }
  if(parisSub.includes(x.toLowerCase())){
    outPut.push( {title: 'paris'});
  }
  if(santoriniSub.includes(x.toLowerCase())){
    outPut.push( {title: 'santorini'});
  }
  res.render('searchresults', {outPut});
  outPut=[];}
});

var helper4=[];
app.get('/wanttogo', function(req,res){
  if(req.session.Authentication){
    MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
     if(err) throw err;
     var db = client.db('myDB');
     db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
      for(let i=0 ; i<(result.wantTogo).length; i++){
        helper4.push({site: result.wantTogo[i]})
      }
     res.render('wanttogo', {helper4})
     helper4=[];
})
})
}
});

app.post('/wantParis', function(req,res){

  if(req.session.Authentication){
    MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
      if((result.wantTogo).includes('paris')){
        helper3.push({destination: 'paris'})
        res.render('paris', {helper3})
        helper3=[];
      }
      else{
        db.collection('myCollection').updateOne({username: req.session.username}, {$push:{ wantTogo: 'paris'}})
        res.status(204).send();
      }
    })
  })
}

})



app.post('/wantAnna', function(req,res){

  if(req.session.Authentication){
    MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
      if((result.wantTogo).includes('annapurna')){
        helper3.push({destination: 'annapurna'})
        res.render('annapurna', {helper3})
        helper3=[];
      }
      else{
        db.collection('myCollection').updateOne({username: req.session.username}, {$push:{ wantTogo: 'annapurna'}})
        res.status(204).send();
      }
  })
})
}
})

app.post('/wantBali', function(req,res){

  if(req.session.Authentication){
    MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
    if((result.wantTogo).includes('bali')){
      helper3.push({destination: 'bali'})
      res.render('bali', {helper3})
      helper3=[];
    }
    else{
    db.collection('myCollection').updateOne({username: req.session.username}, {$push:{ wantTogo: 'bali'}})
    res.status(204).send();}
    })
  })
}

})

app.post('/wantInca', function(req,res){

  if(req.session.Authentication){

    if(req.session.Authentication){
      MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
      if(err) throw err;
      var db = client.db('myDB');
      db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
      if((result.wantTogo).includes('inca')){
        helper3.push({destination: 'inca'})
        res.render('inca', {helper3})
        helper3=[];
      }
      else{
      db.collection('myCollection').updateOne({username: req.session.username}, {$push:{ wantTogo: 'inca'}})
      res.status(204).send();}
      })
    })
  }
}
})


app.post('/wantRome', function(req,res){

  if(req.session.Authentication){
    MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
    if((result.wantTogo).includes('rome')){
      helper3.push({destination: 'rome'})
      res.render('rome', {helper3})
      helper3=[];}
      else{
        db.collection('myCollection').updateOne({username: req.session.username}, {$push:{ wantTogo: 'rome'}})
        res.status(204).send();}
      })
  })
}

})

app.post('/wantSant', function(req,res){

  if(req.session.Authentication){
    MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, (err, result) => {
    if((result.wantTogo).includes('santorini')){
      helper3.push({destination: 'santorini'})
      res.render('santorini', {helper3})
      helper3=[];}
      else{
    db.collection('myCollection').updateOne({username: req.session.username}, {$push:{ wantTogo: 'santorini'}})
    res.status(204).send();
  }
      })
  })
}

})

app.listen(3000);

