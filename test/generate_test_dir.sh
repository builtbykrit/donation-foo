#!/bin/bash
mkdir test_dir
cd test_dir
x=10 
while [ $x -gt 0 ]; 
do
    touch "file_$x.txt"
    x=$(($x-1))
done