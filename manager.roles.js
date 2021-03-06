var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder'),
    roleRunner = require('role.runner');

var managerRoles = {
    
    creepCountTotal: 13,
    
    creepCount: {
        harvesters: 6,
        runners: 0,
        builders: 1,
        upgraders: 6
    },
    
    creepProps: {
        roles: [
            'harvester',
            'runner',
            'builder',
            'upgrader'
        ],
        parts: {
            harvester: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            runner: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            builder: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            upgrader: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
        }
    },

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

        // TODO: move this to manager.game once it's created.
        var creepsAlive = _.filter(Game.creeps);

        if(creepsAlive.length < this.creepCountTotal) {
            for(i = 0; i < this.creepProps.roles.length; i++) {
                var creepsAliveByRoles = _.filter(Game.creeps, (creep) => creep.memory.role == this.creepProps.roles[i]);

                if(this.creepProps.roles[i] == 'harvester' && creepsAliveByRoles.length < this.creepCount.harvesters) {
                        partsToSpawn = this.creepProps.parts.harvester;
                        roleToSpawn = this.creepProps.roles[i];
                }
                else if(this.creepProps.roles[i] == 'runner' && creepsAliveByRoles.length < this.creepCount.runners) {
                        partsToSpawn = this.creepProps.parts.runner;
                        roleToSpawn = this.creepProps.roles[i];
                }
                else if(this.creepProps.roles[i] == 'builder' && creepsAliveByRoles.length < this.creepCount.builders) {
                        partsToSpawn =this.creepProps.parts.builder;
                        roleToSpawn = this.creepProps.roles[i];
                }
                else if(this.creepProps.roles[i] == 'upgrader' && creepsAliveByRoles.length < this.creepCount.upgraders) {
                        partsToSpawn = this.creepProps.parts.upgrader;
                        roleToSpawn = this.creepProps.roles[i];
                }
            }

            var newCreep = Game.spawns['MotherShip'].createCreep(partsToSpawn, undefined, {role: roleToSpawn});
        }
    },
    
    _doWork: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            switch(creep.memory.role) {
                case 'builder':
                    roleBuilder.determineTasks(creep);
                    break;
                case 'upgrader':
                    roleUpgrader.determineTasks(creep);
                    break;
                default:
                    roleHarvester.determineTasks(creep);
            }
        }
    },
};

module.exports = managerRoles;