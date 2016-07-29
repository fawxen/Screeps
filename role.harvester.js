var managerTasks = require('manager.tasks');

var roleHarvester = {

    determineTasks: function(creep) {
        switch(creep.memory.task) {
            case 'deposit':
                managerTasks.deposit(creep, 'upgrade');
                break;
            case 'upgrade':
                managerTasks.upgrade(creep);
                break;
            default:
                managerTasks.harvest(creep, 'deposit', 1);
        }
    }
};

module.exports = roleHarvester;