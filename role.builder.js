var managerTasks = require('manager.tasks');

var roleBuilder = {

    run: function(creep) {
        if(creep.memory.task == 'harvest') {
            managerTasks.harvest(creep);
        }
        else if(creep.memory.task == 'build') {
            managerTasks.build(creep);
        }
        else {
            managerTasks.upgrade(creep);
        }
    }
};

module.exports = roleBuilder;