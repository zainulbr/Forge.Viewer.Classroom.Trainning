/*

The MIT License (MIT)

Copyright (c) Thu Aug 18 2016 Zhong Wu zhong.wu@autodesk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'; // http://www.w3schools.com/js/js_strict.asp

var mongoose = require('mongoose')
var express = require('express')
var router = express.Router()

var db = mongoose.connect('mongodb://localhost/johnsample'); 

var Schema = mongoose.Schema; 
var userScheMa = new Schema({
  name: String,
  price: Number
}); 


router.get('/price/:name', function (req, res) {
  var name = req.params.name
  try {
    var User = db.model('user', userScheMa); 

    User.count({ name: name }, function (err, c) {
      console.log('count is ' + c)
    })

    User.findOne({'name': name}, function (err, item) {
      if (err) {
        res.status(500).end(err.message)
      }else if (item === null) {
        res.end('No Price')
      }else {
        console.log('name is: ' + item.name + ' and price is: ' + item.price)
        res.end(item.price.toString())
      }
    })
  } catch(err) {
    res.status(500).end(err.message)
  }
})

module.exports = router
