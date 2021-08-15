var express = require('express');
var router = express.Router();

const allUsers = [
  {
      "id": 1,
      "name": "Himanshu",
      "age": 27
  },
  {
      "id": 2,
      "name": "Ishita",
      "age": 21
  },
  {
      "id": 3,
      "name": "Sachin",
      "age": 27
  },
  {
      "id": 4,
      "name": "Dhilan",
      "age": 28
  },
  {
      "id": 5,
      "name": "Anurag",
      "age": 24
  }
];

/* GET users listing. */
router.get('/all', function(req, res, next) {
  res.send(allUsers);
});

// Get filtered data
router.get('/:userId', function (req, res, next) {
  const id = parseInt(req.params.userId);
  for (let user of allUsers) {
    if (user.id === id) {
      res.json(user);
      return;
    }
  }
  res.json({"message": "No such user exits"});
});

module.exports = router;
