const Tasks = require("../models/task");

exports.getProfile = (req, res, next) => {
  const user = {
    id: req.user._id,
    email: req.user.email
  };
  res.status(200).json({ status: true, userData: user });
};

exports.getTask = (req, res, next) => {
  const userId = req.params.id;
  Tasks.find({userId : userId}).then(response => {
    res.status(200).json({status : true , tasks : response});
  }).catch(err => {
    console.log(err);
  })
}

exports.createTask = (req, res, next) => {
  const userId = req.params.id;
  const task = new Tasks({
    userId : userId,
    title : req.body.title,
    description : req.body.description, 
    imageUrl : req.body.imageUrl,
  });  

  task.save().then(response => {
    if(response){
      res.status(201).json({status: true, message: "Task Created!!! "});
    }
  }).catch(err => {
    console.log(err);
  })
}

exports.deleteTask = (req, res, next) => {
  const id = req.params.id;
  Tasks.deleteOne({_id : id}).then(result => {
    res.json({ status : true , message : "Task Deleted!" });
  }).catch(err => {
    console.log(err);
  })  
}


exports.getSingleTask = (req, res, next) => {
  const taskId = req.params.id;
  Tasks.findById(taskId).then(response => {
    res.status(200).json({status : true , task : response});
  }).catch(err => {
    console.log(err);
  })
}