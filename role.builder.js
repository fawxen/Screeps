var roleBuilder = {

    run: function(creep) {
        this._determineTask(creep);
    },

    _determineTask: function(creep) {
        if(creep.memory.task == 'harvest' && creep.carry.energy < creep.carryCapacity) {
            this._harvest(creep);
        }
        else {
            this._buildStructures(creep);
        }
        
        /*
        else if(creep.memory.task == 'build') {
            this._buildStructures(creep);
        }
        else {
            this._repairStructures(creep);
        }
        */
    },

    _harvest: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
    
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },

    _buildStructures: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (//structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_WALL ||
                        structure.structureType == STRUCTURE_ROAD);
            }
        });

        if(targets.length && creep.carry.energy > 0) {
            creep.memory.task = 'build';
            
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.memory.task = 'harvest';
        }
    },

    _repairStructures: function(creep) {
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
    }
};

module.exports = roleBuilder;