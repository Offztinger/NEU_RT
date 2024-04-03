## Proyecto base

Instalar paquetes con yarn: `
bash:yarn
`

## Para ejecutar el proyecto

Levanta el contenedor: `
bash: docker compose -f "compose.yml" up -d --build
`

WLS debe estar activado en Windows para la persistencia.

Para generar el esquema: `
bash: yarn prisma generate
`

Para la migración: `
bash: yarn prisma migrate dev
`

Para ejecutar el backend: `
bash: yarn start:dev
`
