var Sequelize = require('sequelize');
var sequelize = new Sequelize((process.env.DATABASE_URL || 'postgres://eexusvltrmluqe:ld7HdOpITubl7nTyqmozVx0kcb@ec2-54-228-213-36.eu-west-1.compute.amazonaws.com:5432/ddmnnc9atia81f')+ '?ssl=true');
//MODELs
global.Sequelize  = Sequelize;
global.Groups = sequelize.import(__dirname + "/model/Groups.js");
global.Users = sequelize.import(__dirname + "/model/Users.js");
global.User2Group = sequelize.import(__dirname + "/model/User2Group.js");
sequelize.sync();