var roleManager = require('role.manager'),
	towerManager = require('tower.manager');

module.exports.loop = function () {
    roleManager.run();

    towerManager.run();
}