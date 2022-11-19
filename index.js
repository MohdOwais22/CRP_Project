var express = require("express");
var app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
var crypto = require("crypto");
const encryption = require("./encryption.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/encrypt", (req, res) => {
//   // get the text from the form
//   var text = req.query.text;
//   var password = req.query.password;

//   // encrypt the password
//   const key = crypto.scryptSync(password, "salt", 32);
//   var iv = crypto.randomBytes(16);
//   var cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
//   var crypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
//   // render the encrypted text and decrypted text
//   res.render("encrypt", {
//     text: text,
//     password: password,
//     crypted_text: crypted,
//     // decrypted_text: decrypted
//   });

//   console.log(crypted);
// });

app.get("/encrypt", (req, res) => {
  // import the encrypt function from encryption.js
  const encrypt = encryption.encrypt;
  // get the text from the form
  var text = req.body.text;
  var password = req.body.password;

  // encrypt the password
  var encrypted = encrypt(text, password);
  // render the encrypted text and decrypted text
  res.render("encrypt", {
    text: text,
    password: password,
    crypted_text: encrypted,
    // decrypted_text: decrypted
  });
  console.log(encrypted);

});

  

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
 }


app.get("/decrypt", (req, res) => {
  decrypt(req.query.text);
  res.render("decrypt", {
    password: req.query.password,
    decrypted_text: decrypt(req.query.text)
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
