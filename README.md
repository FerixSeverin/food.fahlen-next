This is the front-end for https://food.fahlen.dev made with Next.JS


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

In order to run the website as production it is recommended to use the dockerfile together with a docker-compose in the parent-folder that manages ports. The build time can be quite long.

```
docker-compose up --build
```