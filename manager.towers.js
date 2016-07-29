var managerTowers = {

    // Needs to be cleaned up
    run: function(creep) {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
        }
        
        var towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        if(towers) {
            for(i = 0; i < towers.length; i++) {
                var repairableStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD && structure.hits < 2000 ||
                                structure.structureType == STRUCTURE_WALL && structure.hits < 75000);
                    }
                });
                
                var hostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);

                if(hostile) {
                    towers[i].attack(hostile);
                }
                else if(repairableStructure && towers[i].energy > 500) {
                    towers[i].repair(repairableStructure);
                }
            }
        }
    }
};

module.exports = managerTowers;