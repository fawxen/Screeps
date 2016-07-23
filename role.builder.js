var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            
            /*
            var repairableTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL) && structure.hits < 75000;
                }
            });
            */
            
            /*
            if(repairableTargets.length) {
                if(creep.repair(repairableTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairableTargets[0]);
                }
                
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            */
            
           if(targets.length) {
                /*
                for(i = 0; i < targets.length; i++) {
                    if(targets[i].structureType == STRUCTURE_WALL) {
                        if(creep.build(targets[i]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[i]);
                        }
                    }
                }
                */
                
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleBuilder;