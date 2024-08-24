import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';


// Find All users
export const AllUsers = async(req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'username', 'password']
    });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
}

// Register a user
export const OneUser = async(req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.userID
      }
    })
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}
// Login
export const Login = async(req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username
      }
    });

    // Compare
    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) return res.status(400).json({msg: "Wrong Password"});
    const userID = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({userID, username, email},
    process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s'
    });
    const refreshToken = jst.sign({userID, username, email}, 
    process.env.REFRESH_TOKENSECRET, {
      expiresIn: '1d'
    });
    await Users.update({refresh_token: refreshToken}, {
      where: {
        id: userID
      }
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge24: 24 * 60 * 1000 
    });
    res.json({ userID, accessToken });
  } catch (err) {
    res.status(404).json({msg: 'Username not found'});
  }
}
// Logout
export const Logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refreshToken: refreshToken
    }
  });
  if (!user[0]) return res.sendStatus(204);
  const userID = user[0].id;
  await Users.update({refresh_token: null},{
    where:{
      id: userID
    }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}
// Register
export const Register = async(req, res) => {
  const {username, email, password, confPwd} = req.body;
  if (password !== confPwd) return res.status(400).json(
    {msg: "Passwords must match"
  });
  const salt = await bcrypt.genSalt();
  const hashPwd = await bcrypt.hash(password, salt);
  try {
    Users.create({
      username: username,
      email: email,
      password: hashPwd
    })
    res.json({msg: "Registration Successful"});
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}
