var managerRoles = require('manager.roles'),
    managerTowers = require('manager.towers');

module.exports.loop = function () {
    managerRoles.run();
    
    managerTowers.run();
}