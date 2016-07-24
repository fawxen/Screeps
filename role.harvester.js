var roleHarvester = {

    run: function(creep) {
        if(creep.memory.harvesting) {
            if(creep.carry.energy < creep.carryCapacity && !creep.memory.storing) {
                var sources = creep.room.find(FIND_SOURCES);
                
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
                
                creep.memory.harvesting = true;
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                
                if(targets.length > 0) {
                    creep.memory.storing = true;

                    if(creep.carry.energy > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    } else {
                        creep.memory.storing = false;
                    }
                } else {
                    creep.memory.harvesting = false;
                }
            }
        }
        else {
            if(creep.carry.energy > 0) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                creep.memory.harvesting = true;
            }
        }
    }
};

module.exports = roleHarvester;