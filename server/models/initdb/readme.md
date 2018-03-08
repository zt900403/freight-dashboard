use freight

db.createUser(
  {
       user: "freight",
       pwd: "zhangtao43",
       roles: [ { role: "readWrite", db: "freight" } ]
  })