<h1 align="center">
  
  DESCRIPCION PROYECTO FINAL
  
</h1>

1.  **Idea principal**
    La aplicación que me gustaría desarrollar estaría destinada a la gestión de
    hostales y restaurantes que se encuentran en la zona donde vivo y facilitar
    en la medida de lo posible a los cliente tanto la reserva de habitaciones
    como los pedidos en el restaurante.
    También tendría un añadido de información turística que seria la entrada de
    la aplicación, donde el usuario puede ver la localización y sitios de
    interés a visitar en la zona donde esté situado el establecimiento.

    Gestionaría las reservas de modo online donde el usuario vería un calendario
    donde seleccionara la fecha de entrada y la fecha de salida. En caso de la
    fecha no este disponible no se le permitiría seleccionar dicha fecha. Habrá
    diferentes habitaciones donde el usuario podrá elegir diferentes tarifas
    dependiendo de los servicios que quiera.

    En la parte de restaurante, lo que había pensado es que el usuario lea un
    código QR y este le redireccione a la aplicación, donde se le mostrara la
    "carta" de alimentos. El cliente podrá ir añadiendo productos como si un
    carrito de compra se tratara. Lo que me gustaría hacer con esto es que el
    pedido llegase directamente a la cocina, así los camareros solo tendrían
    que llevar los platos y bebidas, por lo que esto contribuiría a la prevención
    de contagios, siendo el contacto mucho menor entre clientes y trabajadores.

    <!-- Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ``` -->

2.  **Desarrollo de la aplicación**

    Para el desarrollo de la aplicación había pensado usar React.js como
    Frontend con el framework Gatsby.js, que implementa herramientas para el
    desarrollo de paginas estáticas, cosa que me vendría bien para el proyecto
    ya que la información que manejaría principalmente es estática.

    Otra herramienta que usaré para el desarrollo del Frontend es "Contentful".
    Esta herramienta es un "CMS" de componentes, donde se puede detallar
    los atributos de un componente (por ejemplo, para el componente Header,
    puedo crear un elemento donde indico que tendrá un logo, 3 botones, 1
    menú despegable, color de fondo...) y luego mediante una llamada a la API
    de la aplicación recuperar dichos atributos de cada componente y crear el
    componente en React para mostrarlos en la aplicación.

    Para la parte de estilos pretendo usar un framework de CSS llamado
    “Bulma”, que está basado en “flex-box". Este framework permite usar sus
    estilos en el formato SCSS(o SASS), por lo que he decidido usar este lenguaje
    para el desarrollo de los estilos de la aplicacion.

    Para el backend he optado por usar Node.js con el framework Express.js
    que facilita y mejora el uso de endpoints y llamadas a API’s tanto internas
    como externas (en mi caso serian internas) y así podría usar de una manera
    más correcta el motor de base de base de datos Firebase desarrollado y
    proporcionado por Google.

    El manejo de datos con este motor se realiza con Objetos fácilmente
    traducibles a JSON por lo que es muy sencillo y económico su uso en
    aplicaciones web

3.  **Adicional**

    - [Contentful](https://www.contentfu.com)

    - [Bulma](https://bulma.io)

    - [Gatsby.js](https://www.gatsbyjs.com)

    - [Express.js](https://expressjs.com/es)

    - [Firebase](https://firebase.google.com)
