## Proyecto base

instalar paquetes con yarn
`bash
yarn
`

## Para ejecutar el proyecto

`bash:
docker compose -f "compose.yml" up -d --build
`

WLS debe estar activado en Windows para la persistencia.

`bash:
yarn start:dev
`

`bash:
yarn prisma generate
`

Por ultimo ejecutar `
bash: yarn prisma migrate dev
`
