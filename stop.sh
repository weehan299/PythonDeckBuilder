#!/bin/bash

# -o means only matching this, i.e. give you as output only the result u match
# -h means no filename
#one way to get pid via regex grep (messy first try, can make it cleaner)
testpid=$(ps -fA | grep "\s\(python app.py\)" | grep -oh "\W\s[0-9]\{4,5\}\s" |
grep -oh "[0-9]\{4,5\}")

#another way to get pid (another way via awk)
pid=$(ps -fA | grep "\s\(python app.py\)" | awk '{print $2}')
kill $pid

tmux kill-pane -t 1
