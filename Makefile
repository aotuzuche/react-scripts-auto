make:
	# makefile

test:
	@rm -rf ../autoui-ts/wiki_src/node_modules/react-scripts-auto
	@cp -ri ./ ../autoui-ts/wiki_src/node_modules/react-scripts-auto
	@rm -rf ../autoui-ts/examples_src/node_modules/react-scripts-auto
	@cp -ri ./ ../autoui-ts/examples_src/node_modules/react-scripts-auto