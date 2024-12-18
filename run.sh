#!/bin/bash

npm i
rm -r ./allure-results/

IMPLEMENTATIONS_DIR="./implementations"
CONFIGURATION_FILE="config.json"

for DIR in "$IMPLEMENTATIONS_DIR"/*; do
    if [ -d "$DIR" ]; then
        IMPLEMENTATION=$(basename "$DIR")
        FILE_PATH="$DIR/$CONFIGURATION_FILE"

        if [ -f "$FILE_PATH" ]; then
            CONFIG=$(jq '.' "$FILE_PATH")
            if [ $? -eq 0 ]; then
                echo $ALLURE_PROJECT_ID
                IMPLEMENTATION=$IMPLEMENTATION npm run test-allure
                ALLURE_PROJECT_ID=$IMPLEMENTATION ./send_results.sh
                rm -r ./allure-results/
                sleep 2
            fi
        fi

    fi
done
