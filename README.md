# GGC
Great Gulf Challenge
## Getting Started
* run `npm install` and `bower install` to install necessary (untracked) modules.
~~ * clone the data submodule: `git submodule add https://github.com/monadnockMedia/GGC-data.git`~~
* install mongodb with homebrew: `brew install mongodb`

## Running
* start mongodb in daemon mode `mongod --fork --logpath ./GGC-data/mongo.log --dbpath ./GGC-data/db`
* run `grunt serve` to view the application

## Running the easy way (n00bs)
* double-click start.command
