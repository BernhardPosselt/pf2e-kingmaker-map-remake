#!/usr/bin/env bash

# Run with ./package.sh 0.0.2
# requires zip, curl, jq

set -e

version="$1"

# create release directories
rm -rf ./build
mkdir -p build/pf2e-kingmaker-map-remake/

# create archive
node ./scripts/update-module-json.mjs "$version"
cp module.json README.md LICENSE CHANGELOG.md OpenGameLicense.md build/pf2e-kingmaker-map-remake/
cp -r packs/ assets/ build/pf2e-kingmaker-map-remake/

cd build
zip -r release.zip pf2e-kingmaker-map-remake
cd -
