class Auth{
    constructor({
        email,
        password,
        phrase
    }){
        this.email = email;
        this.password = password;
        this.phrase = phrase;
    }
}

module.exports = Auth;