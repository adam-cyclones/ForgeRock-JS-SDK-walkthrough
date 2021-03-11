#!/bin/bash

# Search the README.md for the commit log heading then replace bellow with the git log formatted to one line, ignore tagged IGNORE lines
 echo "$(cat README.md | grep -B 999999 'Commit Log')" > README.md

 echo "$(git log --oneline | grep --invert-match IGNORE)" >> README.md
