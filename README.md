# Voila
Voila <small>(`/vwäˈlä/`)</small> es un cliente web que usa los servicios de [Ualá Argentina](https://www.uala.com.ar/), sin usar trackers como Braze o UXCam. Utiliza funciones de Netlify para evitar conflictos con las peticiones entre dominios diferentes (CORS).

> * Al usar este cliente web para un uso inadecuado del servicio de Ualá, estarás incumpliendo los [Términos de Uso](https://www.uala.com.ar/tyc.html) de la misma.
> * Esta aplicación web no es oficial de Ualá, por lo tanto no podrás recibir soporte acerca de ello.


## 📚 Stack
* Vue + Nuxt 2
* TailwindCSS
* Netlify Functions

## 📏 Pre-requistios
* Node.js*
* Yarn
* Netlify CLI

> \* Node v17 tiene [conflictos con Webpack](https://github.com/webpack/webpack/issues/14532), el motor de Vue. Es recomendable usar Node v16.

## 📖 Recursos
### Nuxt
* [Estructura del proyecto](https://nuxtjs.org/docs/get-started/directory-structure)
* [Lifecycle de la instancia](https://nuxtjs.org/docs/concepts/nuxt-lifecycle)
* [El "context" de Nuxt](https://nuxtjs.org/docs/internals-glossary/context)

### Netlify
* [Netlify CLI](https://cli.netlify.com/)
* [Archivo de configuración](https://docs.netlify.com/configure-builds/file-based-configuration/)
* [Funciones serverless](https://docs.netlify.com/functions/overview/)
## 🚀 Compilación rapida
1. Clona el repositorio, si quieres puedes forkearlo y clonarlo desde allí.
```sh
$ git clone https://github.com/saektide/voila.git
```

2. Ve a la carpeta del repositorio clonado e instala las dependencias.
```sh
$ cd voila
$ yarn
```

3. Una vez instaladas las dependencias, ejecuta el servidor de desarrollo por medio del CLI de Netlify. Se abrirá una ventana del navegador que tengas por defecto con la dirección.
```sh
$ netlify dev
```

## ⚖ Licencia
Voila está bajo la licencia [MIT](/LICENSE).