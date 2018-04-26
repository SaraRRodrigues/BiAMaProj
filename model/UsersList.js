module.exports = UsersList;

const User = require('./User');

function UsersList(users){

    var result = []

    for (let index = 0; index < users.length; index++) {
        result[index] = users[index];
        
    }

    this.UsersList = result;
}