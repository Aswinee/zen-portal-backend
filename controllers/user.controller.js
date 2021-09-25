const { isValidObjectId } = require("mongoose");
const User = require("../models/auth.model");
var mongoose = require("mongoose");

exports.readUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  console.log(isValidObjectId(userId));
  var id = mongoose.Types.ObjectId(userId);
  let user = await User.findOne({ _id: id });
  await user.save();
  res.json(user);
};

exports.addQuery = async (req, res) => {
  const { id, queryId, title, description } = req.body;
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330; // IST offset UTC +5:30
  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var day = currentTime.toISOString().slice(0, 10);
  let createdAt = day + " " + hoursIST + ":" + minutesIST;

  let user = await User.findOne({ _id: id });
  var query = {
    id: queryId,
    title,
    description,
    status: "Active",
    mentor: "",
    createdAt,
  };

  user.queries.push(query);
  await user.save();
  res.json(user);
};

exports.submitTask = async (req, res) => {
  const { id, taskId, github, deployment, comments } = req.body;

  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330; // IST offset UTC +5:30
  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var day = currentTime.toISOString().slice(0, 10);
  let submittedAt = day + " " + hoursIST + ":" + minutesIST;

  let user = await User.findOne({ _id: id });
  console.log("user", user);

  for (let i in user.tasks) {
    if (user.tasks[i].id == taskId) {
      user.tasks[i].github = github;
      user.tasks[i].deployment = deployment;
      user.tasks[i].userComments = comments;
      user.tasks[i].submittedAt = submittedAt;
    }
  }
  user.geekcoins += 1000;
  user.markModified("tasks");
  user.save();
  console.log("user1", user);
  res.json(user);
};
