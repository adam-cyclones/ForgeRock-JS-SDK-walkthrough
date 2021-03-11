#!/bin/bash

# Search the README.md for the commit log heading then replace bellow with the git log formatted to one line, ignore tagged IGNORE lines
 echo "$(cat README.md | grep -B 999999 'Commit Log')" > README.md

# git log then ignore then format to md bullets
 echo "$(git log --oneline --reverse | grep --invert-match IGNORE | sed -e 's/^/- https:\/\/github.com\/adam-cyclones\/ForgeRock-JS-SDK-walkthrough\/commit\//')" >> README.md
