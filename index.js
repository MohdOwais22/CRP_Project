var express = require("express");
var app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
var crypto = require("crypto");
const { type } = require("os");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/encrypt", (req, res) => {
  // get the text from the form
  var text = req.query.text;
  var password = req.query.password;

  // encrypt the password
  const key = crypto.scryptSync(password, "salt", 32);
  var iv = crypto.randomBytes(16);
  var cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  var crypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");

  // render the encrypted text and decrypted text
  res.render("encrypt", {
    text: text,
    password: password,
    crypted_text: crypted,
    // decrypted_text: decrypted
  });

  console.log(crypted);
});

app.get("/decrypt", (req, res) => {
  var algorithm = "aes-256-ctr";
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.crypted, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
