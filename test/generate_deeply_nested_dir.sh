#!/bin/bash
mkdir test_dir_deep
cd test_dir_deep
x=20 
while [ $x -gt 0 ]; 
do
    if [ $x -eq 5 ]
    then
        mkdir test_dir_child
        cd test_dir_child
    fi
    touch "file_$x.txt"
    x=$(($x-1))
done