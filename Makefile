gen:
	ts-node generator/flarebyte/generate.ts
	prettier --write flarebyte_com/index.html
	prettier --write flarebyte_com/fr/index.html