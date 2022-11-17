// aes algo to encrypt a string

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password
var iv = crypto.randomBytes(16);

function encrypt(text){
    var cipher = crypto.createCipheriv(algorithm,password,iv);
    var crypted =
    cipher
    .update(text,'utf8','hex')
    cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipheriv(algorithm,password,iv);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

var hw = encrypt("hello world")
// outputs hello world

console.log(decrypt(hw));
// outputs hello world


/// commit by anshulll