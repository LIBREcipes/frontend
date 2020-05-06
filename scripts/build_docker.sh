#!/usr/bin/env bash

DIR=$(dirname $(readlink -f $0))/..
TAG=latest
BUILD=true
PUSH=false
DEPLOY=false
DEPLOY_HOST=''

if ! ARGUMENTS=$(getopt -o t:nd:p -l tag:,push,deploy:,no-build --name "$0" -- "$@"); then
    echo "Failed to parse arguments"
    exit 1
fi
eval set -- "$ARGUMENTS"

while true; do
  case "$1" in
    -t|--tag)
      TAG="$2"
      shift
      ;;

    -p|--push)
      PUSH=true
      ;;

    -d|--deploy)
      DEPLOY=true
      DEPLOY_HOST="$2"
      shift
      ;;

    -n|--no-build)
      BUILD=false
      ;;

    --)
      break
      ;;

    *)
      echo "Invalid: $1"
      exit 1
      ;;
  esac
  shift
done

$BUILD && {
    echo 'Building...'
    docker build -t mattydebie/librecipes-frontend:$TAG $DIR
}

$PUSH && {
    echo 'Pushing to dockerhub...'
    docker push mattydebie/librecipes-frontend:$TAG
}

$DEPLOY && {
    echo "Deploying on ${DEPLOY_HOST}"
    ssh $DEPLOY_HOST << EOF
mkdir cooksel -p
cd cooksel
docker-compose pull app
docker-compose up -d
EOF
}

