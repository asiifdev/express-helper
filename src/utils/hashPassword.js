import bcrypt from 'bcryptjs';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt)

export { hashPassword }