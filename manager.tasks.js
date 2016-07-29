var managerTasks = {
    
    harvest: function(creep, fallbackTask, source) {
        var sources = creep.room.find(FIND_SOURCES);
        
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[source]);
            }
        } else {
            creep.memory.task = fallbackTask;
        }
    },

    build: function(creep, fallbackTask) {
        // Not ideal, but I wanted to prioritize by structure type.
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_ROAD);
            }
        });

        if(targets.length) {
            if(creep.carry.energy > 0) {
                creep.memory.task = 'build';
                
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.memory.task = 'harvest';
            }
        } else {
            creep.memory.task = fallbackTask;
        }
    },
    
    deposit: function(creep, fallbackTask) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
        
        if(targets.length > 0) {
            if(creep.carry.energy > 0) {
                creep.memory.task = 'deposit';

                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.memory.task = 'harvest';
            }
        } else {
            creep.memory.task = fallbackTask;
        }
    },

    upgrade: function(creep) {
        if(creep.carry.energy > 0) {
            creep.memory.task = 'upgrade';
            
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            creep.memory.task = 'harvest';
        }
    },

    retrieve: function(creep) {
        // do the stuffz
    }
    
    /*

    // our tower does the repairing now.
    // saving for possible later use.

    repair: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_ROAD && structure.hits < 2000 ||
                    structure.structureType == STRUCTURE_WALL && structure.hits < 50000);
            }
        });

        if(creep.carry.energy > 0) {
            if(targets.length) {
                creep.memory.task = 'repair';
                
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.memory.task = 'build';
            }
        } else {
            creep.memory.task = 'harvest';
        }
    },

    */
};

module.exports = managerTasks;