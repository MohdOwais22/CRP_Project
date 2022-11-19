var express = require("express");
var app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
var crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

function encrypt(text, password, algoType) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const encryptedPass = encrypted.toString("hex");
  console.log("encryptedPass: " + encryptedPass);
  return encryptedPass;

}

// function decrypt(password) {
//   let iv = Buffer.from(password.iv, "hex");
//   let encryptedText = Buffer.from(text.encryptedPass, "hex");
//   let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   const decryptedPass = decrypted.toString();
//   console.log("decryptedPass: " + decryptedPass);
//   return decryptedPass;
// }

app.get("/encrypt", (req, res) => {
  // get the text from the form
  var text = req.query.text;
  var password = req.query.password;
  var algoType = req.query.algo_chosen;

  // passing to text and password to the encypt function
  var crypted = encrypt(text, password, algoType);
  
  // render the encrypted text and decrypted text
  res.render("encrypt", {
    text: text,
    password: password,
    crypted_text: crypted,
    // decrypted_text: decrypted
  });
});

// app.get("/decrypt", (req, res) => {
//   var decrypted = decrypt(crypted);
//   console.log("decrypted: " + decrypted);

// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
