const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

module.exports.signIn = async (req, res, next) => {
  try {
    let { userName, passWord } = req.body;
    console.log(req.body);

    let user = await User.findOne({ where: { userName } });
    if (user) {
      if (passWord === user.dataValues.PassWord) {
        const payload = {
          id: user._id,
          userName: user.dataValues.UserName
        };
        jwt.sign(payload, "phong1234", { expiresIn: 3600 }, (err, token) => {
          if (err) res.json(err);
          res.status(200).json({
            success: true,
            token
          });
        });
      }
    } else {
      console.log("Sai thong tin tai khoan");

      return res.status(400).json({
        error: "Sai thông tin tài khoản"
      });
    }
  } catch (error) {
    res.status(400).json({
      error
    });
  }
};
