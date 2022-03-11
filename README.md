# APIs-Distrubuted-Systems
Auth API using JWT, Entities API &amp; Proxy Service

* El servicio de autenticación expone la funcionalidad para registrar e ingresar como usuario, devolviendo algo que demuestra la identidad del usuario (Un JWT). Este algo luego es usado para poder acceder al servicio de API.
* La API de Entidades expondrá vehiculos, permitiendo realizar operaciones CRUD sobre las instancias de esa entidad, si y solo si el usuario está autenticado.
* El servicio Proxy, actuando de cara a la peticiones, es capaz de comprimir su respuesta si la petición HTTP que recibe asi lo desea, este servicio hace llegar las peticiones que lleguen al segundo servicio. 
* El segundo servicio recibe las peticiones en sí y realiza las operaciones sobre la base de datos de la entidad, segun la petición del usuario.
