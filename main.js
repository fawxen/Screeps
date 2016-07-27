var managerRoles = require('manager.roles');
var managerTowers = require('manager.towers');

module.exports.loop = function () {
    managerRoles.run();
    
    managerTowers.run();
}