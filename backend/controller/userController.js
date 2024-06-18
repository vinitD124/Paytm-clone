const zod = require("zod");
const { User, Account } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupBody = zod.object({
  userName: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

exports.signup = async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      success: false,
    });
  }

  const existingUser = await User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
      success: false,
    });
  }

  const { userName, firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    firstName,
    lastName,
    password: hashedPassword,
  });

  const userId = newUser._id;


  await Account.create({
    userId,
    balance: parseInt(Math.random() * 10000),
  });



  const token = jwt.sign(
    {
      userId,
    },
    "TOKEN"
  );

  res.status(200).json({
    success: true,
    token,
  });
};

const signinBody = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

exports.signin = async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      success: false,
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "TOKEN"
    );

    user.token = token;
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user,
      message: "logged in sucessfully",
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Wrong Password",
    });
  }
};

const updateBody = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

exports.updateUser = async (req, res) => {
  const validation = updateBody.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Error while updating information",
      errors: validation.error.errors,
    });
  }

  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  let { lastName, firstName } = req.body;

  try {
    const updateUser = await User.updateOne(
      { _id: req.userId },
      {
        password: hashedPassword,
        firstName,
        lastName,
      }
    );
    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or no changes made",
      });
    } else {
      return res.status(200).json({
        message: "User updated successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getBulkUser = async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });


  res.json({
    user:users.map(user=>({
        userName:user.userName,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
    }))
  })
};


exports.getUser = async (req,res)=>{
    
    const user = await User.findOne({
        _id: req.userId,
      });

      res.status(200).json({
        success:true,
        user
      })
    

}