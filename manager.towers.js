var managerTowers = {

    run: function(creep) {
        // Move this asap
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
        }
        
        var towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
            	return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        if(towers) {
            var closestDamagedStructure = towers[0].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax * .5 && structure.hitsMax == 5000
            });
            
            var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if(closestDamagedStructure && towers[0].energy > 500) {
                towers[0].repair(closestDamagedStructure);
            }
            else if(closestHostile) {
                towers[0].attack(closestHostile);
            }
        }
    }
};

module.exports = managerTowers;