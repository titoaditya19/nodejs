var users;
var tokenUser;
module.exports = {
    setToken: function(token){
        tokenUser = token
    },

    setUser: function(user){
        users = user
    },

    getToken: function(){
        return token; 
    },

    getUser: function(){
        return users;
    }
   
}