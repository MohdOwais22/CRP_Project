var express = require("express");
var app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
var crypto = require("crypto");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

app.get("/", (req, res) => {
  res.render("index");
});

function encrypt(password, algoType) {
  switch (algoType) {
    case 1:
      // AES algo
      let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
      let encrypted = cipher.update(password);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };

    case 2:
      // Hashing algo
      let pass = md5(password);
      return pass;

    case 3:
      // Salting algo
      const hash = bcrypt.hashSync(password, saltRounds);
      return hash;

  }
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
} 

app.get("/encrypt", (req, res) => {
  // get the text from the form
  var text = req.query.text;
  var password = req.query.password;
  var algoType = req.query.algo_chosen;

  // passing the text and password to the encypt function
  var crypted = encrypt(password, parseInt(algoType));
  // var decrypted = decrypt(crypted);
  
  // render the encrypted text
  res.render("encrypt", {
    text: text,
    password: password,
    crypted_text: crypted, 
    algo_type: algoType,
    crypted_text: crypted.encryptedData,
    decrypted_text: decrypted
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
