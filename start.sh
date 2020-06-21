#!/bin/bash

tmux split-pane
tmux select-pane -U
pwd=$(pwd)

cd $pwd/FlaskBackEnd

source venv/bin/activate
python app.py &
tmux select-pane -U
tmux send-keys -t 1 cd Space $pwd/frontend Space Enter
tmux send-keys -t 1 npm Space start Enter
tmux select-pane -U

echo "i am here $pwd"
