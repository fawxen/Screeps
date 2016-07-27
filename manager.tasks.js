var managerTasks = {
    
    harvest: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
    
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },

    build: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (//structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_WALL ||
                        structure.structureType == STRUCTURE_ROAD);
            }
        });

        if(targets.length && creep.carry.energy > 0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.memory.task = 'harvest';
        }
    },

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
    
    retrieve: function(creep) {
        // do stuffz
    },
    
    deposit: function(creep) {
        // do stuffz
    },
    
    upgrade: function(creep) {
        // do stuffz
    }
};

module.exports = managerTasks;