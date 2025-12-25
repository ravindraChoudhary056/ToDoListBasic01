// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

//  SIGN UP (POST)
router.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;

    // check if user exists
    const UserexitingCheck = await User.findOne({ name }); // mongodb query
    if (UserexitingCheck) {
      return res.json({ success: false, message: `${name} already your account exit` });
    }

    // hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // me hash passward use nhi kar rha hu kykoi mujhe yhi passward return karna he

    // save new user
    const newUser = new User({ name, password});
    await newUser.save(); //save() MongoDB (Mongoose) ka built-in function hai

    res.json({ success: true, message: `${name} registered successfully` });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error.message });
  }
});

// SIGN IN (POST)
router.post("/signin", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.json({ success: false, message: `${name} not exit your acconut, please sign up` });

    const isMatch = await (password=== user.password);
    if (!isMatch) return res.json({ success: false, message: "Wrong password" });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error.message });
  }
});

// GET TASKS
router.get("/getTasks/:name", async (req, res) => {
  try {
    const { name } = req.params; // for query

    const user = await User.findOne({ name });
    if (!user) {
      return res.json({ success: false, tasks: [] });
    }

    res.json({
      success: true,
      tasks: user.tasks
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// ADD TASK (POST)
router.post("/addTask", async (req, res) => {
 try{
  // expect body: { name: string, task: string }
  const { name, task } = req.body;

  const user = await User.findOne({ name });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  user.tasks.push(task);
  await user.save();

  res.json({ success: true });

 } catch (error) {
  res.json({ success: false, message: error.message });
 }
});


// Delete Task


// DELETE TASK BY TEXT
router.post("/deleteTaskByText", async (req, res) => {
  try {
    const { name, task } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.tasks = user.tasks.filter(t => t !== task);
    await user.save();

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});



// FORGET PASSWORD (POST)
router.post("/forget", async (req,res)=>{
  try {
   const {name}= req.body;  
   const user=await User.findOne({name});
   

   if(!user){
    return res.json({sucess:false,massage:`${name} not exit your acconut`});
   }

   const readablePassword= user.password; // ye simple password he
   res.json({success:true,message:"Your password is: "+readablePassword});

  } catch(error){
    res.json({success:false,message:"Error: "+ error.message});
  }
})
// UPDATE USER DETAILS
router.post("/update",async (req,res)=>{
  try{
    
  const {name , password,newname,newpassword }= req.body;
   
  const user=await User.findOne({name});
   
  if(!user){
    return res.json({success:false,massage:`${name} not exit your acconut`})
  }
   
  if(user.password!=password){
   
     return res.json({success:false,massage:`${name} passward is wrong`})
  }
  // update user delatis
  
  if(newname){
 user.name=newname;
  
  }
 if(newpassword){
  user.password=newpassword;
   
  }
   await user.save();

res.json({success:true,message:"your details is updated"});

  }
  catch(error){
     res.json({success:false,message:"Error: "+ error.message});
  }
})


module.exports = router;
