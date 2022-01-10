#!/bin/bash

set -e

GREEN="\e[32m"
ORANGE="\e[33m"
NC="\e[0m"

echo "${GREEN}=> Building image. It can take several minutes...${NC}"
echo "   running: docker-compose build --no-cache -q"
echo ""
docker-compose build --no-cache -q

echo ""
echo "${GREEN}=> Installing dependencies...${NC}"
echo "   running: docker-compose run --rm server yarn"
echo ""
docker-compose run --rm server yarn

echo ""
echo "${GREEN}=> Starting container with a hot reload server${NC}"
echo "   running: docker-compose up -d adminer && docker-compose up dev"
echo ""
echo "${ORANGE}NOTE: By selecting 'run' compose command instead 'up', with the${NC}"
echo "${ORANGE}  flag '--service-ports' will can interact with dev server, e.g.${NC}"
echo "${ORANGE}  typing 'rs' to restart it manually${NC}"
echo ""
echo "${ORANGE}NOTE: If preferred can add the next alias to '~/.bash_aliases':${NC}"
echo "${ORANGE}  alias yarn='docker-compose run --rm --service-ports server yarn'${NC}"
echo "${ORANGE}  to substitute the local command for the command in the container${NC}"
echo ""
docker-compose up -d adminer
docker-compose up dev
