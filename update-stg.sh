#!/bin/bash

for d in css fonts img js; do
    rsync -avzh --progress $d lockbox:~/ansible/roles/apps-fp-o/files/fedmenu-staging/
done
