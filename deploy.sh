#!/bin/bash
set -e

npm i && bower i && npm run build -- -e production

if [ "$TRAVIS_BRANCH" == "master" ]; then
  pushd dist &> /dev/null
    git init
    git config user.name "AutoBot"
    git config user.email "dylan947@gmail.com"
    git add -A
    git commit -m "Deploy to GitHub pages"
    git push --force "https://${GH_TOKEN}@${GH_REF}.git" master
  popd &> /dev/null
fi
