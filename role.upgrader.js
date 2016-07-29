var managerTasks = require('manager.tasks');

var roleUpgrader = {

    determineTasks: function(creep) {
        switch(creep.memory.task) {
            case 'upgrade':
                managerTasks.upgrade(creep);
                break;
            default:
                managerTasks.harvest(creep, 'upgrade', 0);
        }
    }
};

module.exports = roleUpgrader;