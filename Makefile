gen:
	npx ts-node generator/flarebyte/generate.ts
	npx prettier --write flarebyte_com/index.html
	npx prettier --write flarebyte_com/fr/index.html