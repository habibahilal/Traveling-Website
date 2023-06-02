var express = require('express');
var fs = require('fs');
var path = require('path');
var session = require('express-session');
var app = express();
const PORT = process.env.PORT || 3030;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret', saveUninitialized: false, resave: false, cookie: {maxAge: 1000 * 60 * 60}}));


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
var x = '';
var y = '';
app.post('/login', function(req,res){
  x = req.body.username;
  y = req.body.password;
  if(x=='admin' && y=='admin'){
    req.session.username = x;
    res.render('home');
  }
  else{
    helper2.push({title: 'login'});
    res.render('login', {helper2});;}
    helper2=[];
    
   })

app.get('/registration', function(req,res){
  res.render('registration',{helper})
});

var helper=[];
app.post('/register', function(req,res){
  res.render('login', {helper2})
});


app.get('/home', function(req,res){
  if(req.session.username='admin'){
    res.render('home');}
});

app.get('/hiking', function(req,res){
  if(req.session.username=='admin'){
  res.render('hiking')}
});

app.get('/cities', function(req,res){
  if(req.session.username=='admin'){
  res.render('cities')}
});

app.get('/islands', function(req,res){
  if(req.session.username=='admin'){
  res.render('islands')}
});

app.get('/santorini', function(req,res){
  if(req.session.username=='admin'){
  res.render('santorini', {helper3})}
});

app.get('/rome', function(req,res){
  if(req.session.username=='admin'){
  res.render('rome', {helper3})}
});


var helper3= [];
app.get('/paris', function(req,res){
  if(req.session.username=='admin'){
  res.render('paris', {helper3})}
});

app.get('/inca', function(req,res){
  if(req.session.username=='admin'){
  res.render('inca', {helper3})}
});

app.get('/bali', function(req,res){
  if(req.session.username=='admin'){
  res.render('bali', {helper3})}
});

app.get('/annapurna', function(req,res){
  if(req.session.username=='admin'){
  res.render('annapurna', {helper3})}
});

app.get('/searchresults', function(req,res){
  if(req.session.username=='admin'){
  res.render('searchresults');}
});

var outPut=[];
app.post('/search', function(req,res){
  if(req.session.username=='admin'){
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
  if(req.session.username=='admin'){
     res.render('wanttogo', {helper4})
     helper4=[];
}
});


app.post('/wantParis', function(req,res){

  if(req.session.username=='admin'){
    res.status(204).send();
  }
})


app.post('/wantAnna', function(req,res){

  if(req.session.username=='admin'){
    res.status(204).send();
  }
})

app.post('/wantBali', function(req,res){

  if(req.session.username=='admin'){
    res.status(204).send();
  }

})

app.post('/wantInca', function(req,res){

  if(req.session.username=='admin'){
    res.status(204).send();
  }
})


app.post('/wantRome', function(req,res){
  if(req.session.username=='admin'){
    res.status(204).send();
  }

})

app.post('/wantSant', function(req,res){
  if(req.session.username=='admin'){
    res.status(204).send();
  }
  })

app.listen(3000);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
