var roleBuilder = {

    run: function(creep) {
        this._determineTask(creep);
    },

    _determineTask: function(creep) {
        if(creep.memory.task == 'harvest' && creep.carry.energy != creep.carryCapacity) {
            this._harvest(creep);
        }
        else if(creep.memory.task == 'build') {
            this._buildStructures(creep);
        }
        else {
            this._repairStructures(creep);
        }
    },

    _harvest: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
    
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },

    _buildStructures: function(creep) {
        var target = creep.room.find(FIND_CONSTRUCTION_SITES);

        if(target.length && creep.carryCapacity != 0) {
            if(creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0]);
            }
        } else {
            creep.memory.task = 'harvest';
        }
    },

     _repairStructures: function(creep) {
        var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD) && structure.hits < 2000;
            }
        });

        if(creep.carry.energy != 0) {
            if(target.length) {
                if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
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