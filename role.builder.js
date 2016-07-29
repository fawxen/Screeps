var managerTasks = require('manager.tasks');

var roleBuilder = {

    determineTasks: function(creep) {
        switch(creep.memory.task) {
            case 'build':
                managerTasks.build(creep, 'upgrade');
                break;
            case 'upgrade':
                managerTasks.upgrade(creep);
                break;
            default:
                managerTasks.harvest(creep, 'build', 0);
        }
    }
};

module.exports = roleBuilder;