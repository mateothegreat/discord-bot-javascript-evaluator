#                                 __                 __
#    __  ______  ____ ___  ____ _/ /____  ____  ____/ /
#   / / / / __ \/ __ `__ \/ __ `/ __/ _ \/ __ \/ __  /
#  / /_/ / /_/ / / / / / / /_/ / /_/  __/ /_/ / /_/ /
#  \__, /\____/_/ /_/ /_/\__,_/\__/\___/\____/\__,_/
# /____                     matthewdavis.io, holla!
#
VERSION ?= $(shell git rev-parse HEAD)
IMAGE   ?= mateothegreat/discord-bot-javascript-evaluator

.PHONY: build

all: build push

build: 		; docker build -t $(IMAGE) .
run: 		; docker run -d
push:		; docker push $(IMAGE)
