var bcrypt = require('bcrypt');
const saltRounds = 10;


const hashPassword = async(password) =>{
    try {
        const newPassword = await bcrypt.hash(password,saltRounds)
        return newPassword;
    } catch (error) {
        console.log(error);
    }
}

module.exports = hashPassword;