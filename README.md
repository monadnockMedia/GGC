# GGC
Great Gulf Challenge
## Getting Started
* run `npm install` and `bower install` to install necessary (untracked) modules.
* clone the data submodule: `git submodule add https://github.com/monadnockMedia/GGC-data.git`

## Running
* start mongodb in daemon mode `mongod --fork --logpath ./GGC-data/mongo.log --dbpath ./GGC-data/db`
* run `grunt serve` to view the application
