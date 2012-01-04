EXTNAME := inline-media-type
KEYFILE := $(EXTNAME).pem
EXTDIR  := $(EXTNAME)
SHELL   := /usr/bin/env bash
CHROME  := open /Applications/Google\ Chrome.app -n --args
CWD     := $(shell pwd)
#SIZE    := $(shell wc -c <$(CRXFILE) | tr -d ' ')
VERSION := $(shell python -c "import json,sys;print json.loads(sys.stdin.read()).get('version','')" < $(EXTDIR)/manifest.json)

all: install

install:
	echo -e "Open Chrome,\ngo to <chrome://extensions>,\ncheck <Developer mode>,\nclick <Load unpacked extension>\nand select"
	echo $(CWD)/$(EXTNAME)

pack:
	$(CHROME) --pack-extension=$(CWD)/$(EXTNAME) --no-message-box

repack:
	$(CHROME) --pack-extension=$(CWD)/$(EXTNAME) --pack-extension-key=$(CWD)/$(EXTNAME).pem --no-message-box

zipball:
	zip $(EXTNAME)-$(VERSION).zip $(EXTDIR)/*
