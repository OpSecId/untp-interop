#!/bin/bash
. .env

ALLURE_RESULTS_DIRECTORY='allure-results'
PROJECT_ID=$(echo "$ALLURE_PROJECT_ID" | sed -e 's/ /-/g' -e 's/\(.*\)/\L\1/')

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
FILES_TO_SEND=$(ls -dp $DIR/$ALLURE_RESULTS_DIRECTORY/* | grep -v /$)
if [ -z "$FILES_TO_SEND" ]; then
  exit 1
fi

FILES=''
for FILE in $FILES_TO_SEND; do
  FILES+="-F files[]=@$FILE "
done

set -o xtrace
echo "------------------LOGIN-----------------"
curl -X POST "$ALLURE_SERVER/allure-docker-service/login" \
  -H 'Content-Type: application/json' \
  -d "{
    "\""username"\"": "\""$ALLURE_SECURITY_USER"\"",
    "\""password"\"": "\""$ALLURE_SECURITY_PASS"\""
}" -c cookiesFile -ik

echo "------------------EXTRACTING-CSRF-ACCESS-TOKEN------------------"
CRSF_ACCESS_TOKEN_VALUE=$(cat cookiesFile | grep -o 'csrf_access_token.*' | cut -f2)
echo "csrf_access_token value: $CRSF_ACCESS_TOKEN_VALUE"

echo "------------------SEND-RESULTS------------------"
curl -X POST "$ALLURE_SERVER/allure-docker-service/send-results?project_id=$PROJECT_ID&force_project_creation=true" \
  -H 'Content-Type: multipart/form-data' \
  -H "X-CSRF-TOKEN: $CRSF_ACCESS_TOKEN_VALUE" \
  -b cookiesFile $FILES -ik

echo "------------------GENERATE-REPORT------------------"
curl -X GET "$ALLURE_SERVER/allure-docker-service/generate-report?project_id=$PROJECT_ID" \
  -H "X-CSRF-TOKEN: $CRSF_ACCESS_TOKEN_VALUE" \
  -b cookiesFile -ik
