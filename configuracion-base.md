# Descripción

Este paper describe los pasos a seguir para configurar un proyecto con NodeJS+Typescript (se asúme que ya se tiene onstalado NodeJs y el proyecto estará optimizado para el desarrollo con VSCode) con soporte para:

* [Eslint](https://eslint.org/): Paquete utilizado para verificar el estilo de cósigo sigioendo las u conjunto de reglas, en este caso standard-typescript
* [Typescript](https://www.typescriptlang.org/): Superset de javascript
* [ExpressJS](https://expressjs.com): Framework para desarrollo de API Rest/Web Apps
* [Commit Lint](https://commitlint.js.org/#/): Paquete utilizado para verificar las reglas de [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) a los Mensajes de los commits
* [Prettier](https://prettier.io/): Paquete utilizado, en conjunto con eslint, para formatear cósigo siguiendo un conjunto de reglas
* lint-staged: Con este paquete se logra ejecutar scripts tales como lint y format unicamente a los archivos, en un repositorio git, que se encuentren en staged.
* [HuskyJS](https://typicode.github.io/husky/#/): este paquete permite la habilitación de git hooks los cuales se integran con NodeJS (package.json) y que dan la posibilidad de implementar procesos de revición de código (eslint, prettier, commitlint, lint-staged) antes de ejecutar comandos de git tales como `git commit`, `git push`, entre otros.

## Entorno de desarrollo

* [NodeJS](https://nodejs.org/en) es un entorno de ejecución de javascript y que con algunos plugins puede ejecutar aplicaciones desarrolladas en typescipts (solo para entornos de desarrollo).
* npm y yarn : estos son conocidos como manejadores de paquetes para NodeJs. Estos permiten gestionar los paquetes en nuestro proyecto. En el caso de este proyecto usaremos yarn. cabe destacar que npm viene instalado por defecto en Node y para instalar yarn, basta con ejecutar `npm i -g yarn`.
* Visual Studio Code: Editor de código por excelencia para proyectos Javascript/Typescript. Es importanme mensionar que es necesario tener instalacos, como minimo, las siguientes extensiones:
    - [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [conventional commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)
    - [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
    - [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
    - [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
    - [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
    - [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)
    - [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

## Inicialización de un proyecto NodeJS+Typescript

Para inicializar un proyecto en NodeJs con soporte para typescript, realizaremos los siguientes pasos:

1. Crear un directorio con el nombre del proyecto: `mkdir <nombre proyecto>` y luego ingresar al mismo `cd <nombre proyecto>`
2. Inicializar el proyecto NodeJS ejecutando `npm init -y`. Este comando creará el archivo package.json y que contiene la configuración básica de nuestro proyecto.
3. Instalar el soporte para type script ejecutando `yarn add -d typescript`
4. inicializar la configuracion de typescript con `npx tsc --init` el cual creará el archivo tsconfig.json el cual conteiene la configuración pbásica de typescript

## Configuraciónde typescript

Es necesario realizar alguno cambios en la configuracion de type script. A continuación se muestra el archivo luego de los cambio:

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "target": "ES2021" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "module": "CommonJS" /* Specify what module code is generated. */,
    "rootDir": "./src" /* Specify the root folder within your source files. */,
    "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "baseUrl": "./src" /* Specify the base directory to resolve non-relative module names. */,
    "paths": {
      "@Config/*": ["config/*"],
      "@Routes/*": ["routes/*"],
      "@Controllers/*": ["controllers/*"],
      "@Entities/*": ["entities/*"],
      "@Dtos/*": ["dtos/*"],
      "@Utils/*": ["utils/*"]
    } /* Specify a set of entries that re-map imports to additional lookup locations. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Como aplaratoria, seccin que se muestra a continuzación se configuran aliases para algunos directorios que se pudrían utilizar dureante el desarrollo de la aplicación. Cabe destacar que esto es completamente opcional y la definición de los mismo es de libre albedrio, lo que si es recomendable es que exista un directorio src en la raiz del proyecto.

```json
    "baseUrl": "./src" ,
    "paths": {
      "@Config/*": ["config/*"],
      "@Routes/*": ["routes/*"],
      "@Controllers/*": ["controllers/*"],
      "@Entities/*": ["entities/*"],
      "@Dtos/*": ["dtos/*"],
      "@Utils/*": ["utils/*"]
    } 
```

## Paquetes de NOdeJS

Es necesario realizar la instalación de los paquetes base, que luego serán configurados, con el siguiente comando

```bash
# typescript
yarn add -D typescript tsc-alias tsconfig-paths
# nodemon
yarn add -D nodemon ts-node
# Conventional Commits
yarn add -D @commitlint/cli @commitlint/config-conventional
# Eslint & prettier
yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-security eslint-plugin-unused-imports
# husky & lint-staged
yarn add -D husky lint-staged
```

Lusgo de realizar la instalación de los paquetes anteriores, será necesario realizar algunas configuraciones para poner a tonos los plugins y extensiones instalados

## Configuración de lint-staged

Lint stage es un paquete que nos ayuda  a realiar una revisión y formateo de codigo al momento de realizar un commit en el repo. A diferencia del script lint, lint-staged aplica comandos o script unicamente a archivos marcados en el staged de git (`git status`)

Para ello debemos agregar la seccion lint-staged configurado en el archivo package.json

```json
...
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "yarn lint",
      "yarn format"
    ]
  },
...
```

## Configuración de prettier

Prettier permite realizar el formateo del códido escrito siquiendo un conjunto de reglas, estas reglas complementan a las de ESlit. La configuración se guarda en el archivo `.prettierrc`

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": false,
  "arrowParens": "avoid"
}
```

## Configuración de eslint - Agregando stadard typescript

Para que eslint realice su trabajo correctamente, es necesario realizar una configuración básica, para ello es necesario crear un archivo con el nombre de `.eslintrc` y agregar el contenido siguiente:

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard-with-typescript"],
  "plugins": [],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["tsconfig.json"]
  },
  "rules": {}
}
```

El paquete `standard-with-typescript` es el equivalente a `standard-js` pero, como su nombre lo indica, está orientado a typescipt.

## Configuración de ESlint - Agregrando compatibilidad con prettier

Prettier es un formateador de código utilizado por muchos lenguajes, pero tiene algunos conflictos con ESlint, para resilver esos conflictos es nesesario el `eslint-config-prettier` en la propiedad extends

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard-with-typescript", "eslint-config-prettier"],
  "plugins": [],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["tsconfig.json"]
  },
  "rules": {}
}
```

Con esto nos aseguramos que prettier tenga prioridad por sobre ESlint en caso de conflicto de reglas.

## Configuración de ESlint - agregando reglas de seguridad

ESlint tiene un plugin que permite agregar un conjunto de reglas adicionales que tienen que ver con la seguridad. Para ello agregamos `plugin:security/recommended` en la propiedad extends

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard-with-typescript", "eslint-config-prettier", "plugin:security/recommended"],
  "plugins": [],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["tsconfig.json"]
  },
  "rules": {}
}
```
## Configuración de ESLint - Agregando manejo de imports

En VSCode existe la posibilidad mediante extensiones, manejar los imports de forma automática, pero con la ayuda de ESLint se puede potenciar aún más con solo agregar `imports` y `unused-imports` en la propiedad plugins


```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard-with-typescript", "eslint-config-prettier", "plugin:security/recommended"],
  "plugins": ["import", "unused-imports"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["tsconfig.json"]
  },
  "rules": {}
}
```

Para finalizar la configuración del manejo de los imports, es necesario implementar algunas reglas para manejar las variables declaradas y que no se estén usando agregando lo siguiente en la propiedad `rules`


```json
{
  "rules": {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```

## Configuración ESLint - Configuración final

Luego de todos los cambios en el archivo `.eslint` debería verse de la siguiente forma

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard-with-typescript", "eslint-config-prettier", "plugin:security/recommended"],
  "plugins": ["import", "unused-imports"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["tsconfig.json"]
  },
  "rules": {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```

## Configuración de husky

Husky permite configurar git hooks dentro del proyecto. Estos hooks se ejecutaran disparados por la ejecución de `git commits` el cual ejecutará los hooks `pre-commit` y `commit-msg` los cuales están localizados en directorio `.husky` en la raíz del proyecto.

- pre-commit: este hook se ejecuta justo antes de resolver el commit, lo que nos permite realizar operaciones justo antes de realizarlo, para este caso se invoca el script lint-staged creado en el archivo package.json. su contenido es el siguiente:

Archivo .husky/pre-commit
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

- commit-msg: Este hook, analiza la estructura del mensage del commit para verficar que cumpla con el formato de conventiona commits usando el paquete `commitlint`, su contenido es siguiente:

Archivo .husky/commit-msg
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn commitlint --edit $1
```

Estos hooks puede ejecutar más de un comando, solo basta con agregarlo en el archivo correspondiente

## Configuración de commitlint

El paquete commitlint usado por el hook commit-msg requiere que relicemos una configuración previa para indicarle que utilice conventional commits. Estas reglas deben estar establecidas en el archivo `commitlint.config.js` con el siguiente contenido

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

## Configuración de nodemon con soporte para typescript

Nodemon es comunmente utilizado en el modo de desarrollo. Normalmente ejecuta un entorno de NodeJS iniciando la aplicación y monitorea los cambios en cualquier archivo indicado en la configuración, si detecta alguno, inmediaramente renicia la ejecución de la aplicación para aplicar los cambios.

El archivo de configuración `nodemon.json` se ubica en el raía del proyecto y su contenido es el siguiente:

```json
{
  "watch": ["src", ".env"],
  "ext": "js,ts,json",
  "ignore": ["src/**/*.spec.ts", "src/**/*.test.ts"],
  "exec": "ts-node -r tsconfig-paths/register --transpile-only"
}
```
El soporte para type script se implementa con el paquete ts-node como se puede ver en la propiedad exec

Con la opcion `-r tsconfig-paths/register` agregamos el soporte para que nodemon pueda enterder los path alias creados previamente enl a configuración del archivo tsconfig.json.

## Configuración de scripts en el package.json

Los script del pachaje.json permiten crear alias de comandos que deben ejecutarse, tales como:
- start: Iniciar la aplicación en producción
- start:dev: Iniciar la ekecución en modo desarrollo
- lint: Ejecutar el linter, en este caso eslint
- format: Ejecutar el code format, en este caso prettier
- prepare: Inicializa el uso de git hooks
- build: Ejecuta la transpilación de typescript a javascript
- clean: Elimina el directorio `dist` el cual es creado por el script build. Para que este funcione correctamente es necesario instalar el paquete `rimraf` mediante `yarn add rimraf`
- postinstall: este script es un hook de NodeJs el cual se ejecuta de forma automática luego de ejecutar `yarn install`

`yarn install` se ejecuta para instalar todos los paquetes definidos en las secciones devdependencies y dependenies localizadas en el archivo packaje.json ya que la la hora de sugir el código al repositorio al SCM, el directorio node_modules debe ser omitido mediante el uso de gitignore.

A continuación se muestra la sección `script del package.json`

```json
...
  "scripts": {
    "start": "node dist/index.js",
    "start:dev": "nodemon src/index.ts",
    "clean": "rimraf dist",
    "lint": "eslint --ext .tsx,.ts,.js,.jsx --fix ./src -c .eslintrc",
    "format": "prettier --write .",
    "prepare": "husky install",
    "build": "yarn clean && yarn lint && yarn format && tsc -p . && tsc-alias",
    "postinstall": "yarn prepare"
  },
...
```

## Configuraciones adicionales

### Editorconfig

[Esditorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) es una extension de VSCode que permite establecer unas normas de edición de archivos para estandarizar algunas regas tales como, cantidad de espacio de tabulación, caracter de fin de linea, etc.

Es taconfiguración se coloca en el archivo `.editorconfig` localizado en el raiz del proyecto

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space

[*.{ts,js,json}]
indent_size = 2
tab_width = 2

[*.{yaml,yml}]
indent_size = 4
tab_width = 4

```

### Git ignore

Con git ignore podemos definir los archivos y disrectorios que serán omitidos en un repositorio git al realizar un commit y evitar enviarlos al SCM. esta configuracion se realiza en el archivo `.gitignore` en el raiz del proyecto. Para generar el archivo se pueden usilizar los sitios web

- https://www.toptal.com/developers/gitignore
- https://mrkandreev.name/snippets/gitignore-generator/

Tambien es posible usar la extension de [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) para VSCode en invicarla desde la paleta de comandos `<CTRL+Shift+P> Add gitignore` y segir las instrucciones.

### ESLint ignore

Al igual que gitignore, ESLint ignore permite indicar los directorios y archivos que serán omitidos a la hora de aplicar la revision del coódigo. este se realiza creando el archivo .eslintignore en el raíz del proyecto.

```
dist/
build/
```

Estos directorios van con consonancia con las opsibles opciones de configuración `outdir` en el archivo `tsconfig.json`

### Prettier ignore

De la misma forma que gitignore y eslintignore podemos definir a que archivos se aplicará el formato con prettier, pero esta vez mediante el archivo .prettierignore

```
dist/
build/
package-lock.json
yarn.lock
```
### Configuraciones propias del VSCode

Las configuraciones siguientes permitiran que se aplique el formato de los achivos deseados al momento que guardar los cambios realizados en los archivos. VSCode aplicará estas reglas de forma automática.

Para ello debemos colocar lo siguiente el en archivo settings.json de VSCode

```json
...
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
...
```

Adicional a estas configuraciones, para lograr remover de forma automática los imports declarados pero no utilizados, debemos indicarle a VSCode que ejecute las reglas correspondientes de eslint-unused-imports agregando en settings.json lo siguiente

```json
...
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript"],
...
```
