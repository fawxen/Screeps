var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRunner = require('role.runner');

var harvesterParts = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
var runnerParts = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
var builderParts = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
var upgraderParts = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE];

var roleManager = {
    
    creepCount: {
        harvesters: 6,
        runners: 0,
        builders: 3,
        upgraders: 3
    },

    run: function() {
        this._wipeCreepMemory();

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        
        if(harvesters.length < 6) {
            var newName = Game.spawns['MotherShip'].createCreep(harvesterParts, undefined, {role: 'harvester'});
        }
        
        var runners = _.filter(Game.creeps, (creep) => creep.memory.role == 'runner');
        
        if(runners.length < 0) {
            var newName = Game.spawns['MotherShip'].createCreep(runnerParts, undefined, {role: 'runner'});
        }
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        
        if(builders.length < 5) {
            var newName = Game.spawns['MotherShip'].createCreep(builderParts, undefined, {role: 'builder'});
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        
        if(upgraders.length < 3) {
            var newName = Game.spawns['MotherShip'].createCreep(upgraderParts, undefined, {role: 'upgrader'});
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role == 'runner') {
                roleRunner.run(creep);
            }
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    },
    
    _wipeCreepMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    },
    
    _spawnCreep: function() {
        // var newName = Game.spawns['MotherShip'].createCreep(harvesterParts, undefined, {role: 'harvester'});
    }
};

module.exports = roleManager;