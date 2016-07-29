var managerTasks = require('manager.tasks');

var roleHarvester = {

    run: function(creep) {
        if(creep.memory.task == 'harvest') {
            managerTasks.harvest(creep, 'deposit', 1);
        }
        else if(creep.memory.task == 'deposit') {
            managerTasks.build(creep, 'upgrade');
        }
        else {
            managerTasks.upgrade(creep);
        }
    }
};

module.exports = roleHarvester;