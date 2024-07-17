BRANCH := $(shell git branch --show-current)
TAG := $(shell for /f "tokens=*" %%t in ('git tag --list "v*" --sort=-v:refname') do @echo %%t & exit)

build:
	set ANALYZE=true && yarn build

build-image:
	docker build -t wonyus/linked:latest .

start-local:
	docker run --env-file ./.env -p 8080:8080 --name node-emqx wonyus/node-emqx:latest

pull-image:
	docker pull wonyus/node-emqx:latest

start:
	docker run --env-file ./.env -p 8080:8080 --name node-emqx wonyus/node-emqx:latest
	
remove-tag:
	git tag -d $(version) && git push origin :refs/tags/$(version)

release:
	git checkout $(BRANCH) && git pull && npm version $(TAG) && git push && git push --tags