var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRunner = require('role.runner');

var roleManager = {
    
    creepCountTotal: 13,
    
    creepCount: {
        harvesters: 6,
        runners: 0,
        builders: 1,
        upgraders: 6
    },

    creepParts: {
        harvester: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        runner: [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
        builder: [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        upgrader: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    },

    creepRoles: [
        'harvester',
        'runner',
        'builder',
        'upgrader'
    ],

    run: function() {
        this._wipeCreepMemory();

        this._spawnCreep();

        this._doWork();
    },
    
    _wipeCreepMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    },
    
    _spawnCreep: function() {
        var roleToSpawn;
        var partsToSpawn;

        var creepsAlive = _.filter(Game.creeps);

        if(creepsAlive.length < this.creepCountTotal) {
            for(i = 0; i < this.creepRoles.length; i++) {
                console.log("test");
                var creepsAliveByRoles = _.filter(Game.creeps, (creep) => creep.memory.role == this.creepRoles[i]);

                if(this.creepRoles[i] == 'harvester') {
                    if(creepsAliveByRoles.length < this.creepCount.harvesters) {
                        partsToSpawn = this.creepParts.harvester;
                        roleToSpawn = this.creepRoles[i];
                    }
                }
                else if(this.creepRoles[i] == 'runner') {
                    if(creepsAliveByRoles.length < this.creepCount.runners) {
                        partsToSpawn = this.creepParts.runner;
                        roleToSpawn = this.creepRoles[i];
                    }
                }
                else if(this.creepRoles[i] == 'builder') {
                    if(creepsAliveByRoles.length < this.creepCount.builders) {
                        partsToSpawn = this.creepParts.builder;
                        roleToSpawn = this.creepRoles[i];
                    }
                }
                else if(this.creepRoles[i] == 'upgrader') {
                    if(creepsAliveByRoles.length < this.creepCount.upgraders) {
                        partsToSpawn = this.creepParts.upgrader;
                        roleToSpawn = this.creepRoles[i];
                    }
                }
            }

            var newCreep = Game.spawns['MotherShip'].createCreep(partsToSpawn, undefined, {role: roleToSpawn});
        }
    },
    
    _doWork: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            
            if(creep.memory.role == 'runner') {
                roleRunner.run(creep);
            }

            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }

            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
    }
};

module.exports = roleManager;