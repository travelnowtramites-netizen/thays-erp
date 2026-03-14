📊 REPORTE OPERACIONAL DEL SISTEMA
Flujo de Operación del Usuario

Sistema de Control de Producción, Inventario y Ventas.

1. MÓDULO INICIO
(MENÚ PRINCIPAL)

Cuando el usuario abre el sistema entra a:

PANTALLA: MENU PRINCIPAL

Propósito:
Centro de navegación del sistema.

No guarda datos.

Solo dirige a los módulos.

Opciones visibles
⚙️ Configuración
🛒 Compras
🥣 Producción
📦 Inventario
📠 Ventas
💸 Gastos
📊 Reportes
2. MÓDULO CONFIGURACIÓN

⚙️ SETTINGS

Este módulo define las reglas del sistema.

Aquí se crean los catálogos.

No se mueve inventario.
No se mueve dinero.

Submenú
Categorias
Materia Prima
Productos
Recetas
Ubicaciones
2.1 SUBMÓDULO
CATEGORÍAS

Sirve para clasificar:

materia prima

productos

Pantalla

Lista de categorías.

Columnas visibles

Nombre
Tipo
Estado
Botones
Agregar
Editar
Eliminar
Volver
Formulario AGREGAR

Campos

Nombre           → Input texto
Tipo             → Selector (Materia Prima / Producto)
Activo           → Checkbox
Lógica del sistema

El sistema:

valida que no exista duplicado

genera ID interno

guarda registro

No afecta inventario.

2.2 SUBMÓDULO
MATERIA PRIMA

Aquí se registran todos los insumos.

Ejemplo:

harina
azúcar
mantequilla
chocolate
Pantalla

Tabla de materia prima.

Columnas

Nombre
Categoría
Unidad
Costo Promedio
Stock mínimo
Botones
Agregar
Editar
Eliminar
Ver inventario
Formulario AGREGAR

Campos

Nombre              → Texto
Categoría           → Lista desplegable
Unidad              → Selector (g / kg / pza / ml)
Stock mínimo        → Número
Activo              → Checkbox
Lógica del sistema

El sistema:

crea ID_MP

guarda registro

inicializa stock en 0

No modifica inventario.

2.3 SUBMÓDULO
PRODUCTOS

Define lo que se vende.

Ejemplo

galleta
brownie
nuvecita
pastel
Pantalla

Lista de productos.

Columnas

Nombre
Categoría
Precio venta
Vida útil
Congelable
Activo
Botones
Agregar
Editar
Eliminar
Administrar receta
Formulario AGREGAR PRODUCTO

Campos

Nombre                → Texto
Categoría             → Lista desplegable
Precio venta          → Moneda
Vida útil (días)      → Número
Congelable            → Checkbox
Activo                → Checkbox
Lógica del sistema

El sistema:

genera ID_PRODUCTO

guarda producto

permite vincular receta.

2.4 SUBMÓDULO
RECETAS

Define cómo se produce cada producto.

Pantalla

Lista de recetas por producto.

Columnas

Producto
Materia prima
Cantidad
Unidad
Botones
Agregar ingrediente
Eliminar
Guardar receta
Formulario

Campos

Producto            → Selección automática
Materia prima       → Lista desplegable
Cantidad            → Número
Unidad              → Automática
Lógica del sistema

El sistema:

vincula producto con insumo

permite múltiples ingredientes

Esto permitirá después:

calcular costo de producción
3. MÓDULO COMPRAS

🛒 COMPRAS

Aquí entra materia prima al negocio.

Pantalla principal

Lista de compras registradas.

Columnas

ID compra
Fecha
Proveedor
Total
Estado
Botones
Nueva compra
Ver detalle
Cerrar compra
Nueva Compra

Formulario encabezado

Campos

Fecha         → Fecha
Proveedor     → Texto
Estado        → Automático (Abierta)
Formulario líneas

Campos

Materia prima     → Selector
Cantidad          → Número
Costo unitario    → Moneda
Botones
Agregar línea
Eliminar línea
Cerrar compra
Lógica del sistema

Cuando se presiona Cerrar compra

El sistema:

suma stock a almacén MP
recalcula costo promedio
registra movimiento en kardex
4. MÓDULO PRODUCCIÓN

🥣 PRODUCCIÓN

Convierte materia prima en producto terminado.

Pantalla

Lista de producciones.

Columnas

Fecha
Producto
Cantidad
Estado
Botones
Nueva producción
Ver lote
Nueva Producción

Formulario

Campos

Producto            → Selector
Cantidad producir   → Número
Fecha producción    → Fecha
Destino inicial     → Selector (Congelado / Horneado)
Lógica del sistema

Cuando el usuario presiona PRODUCIR

El sistema ejecuta:

1 Leer receta

Busca ingredientes.

2 Calcular consumo
cantidad receta × cantidad producir
3 Validar inventario

Si falta materia prima:

producción bloqueada
4 Ejecutar producción

Si hay stock suficiente:

descuenta MP
crea lote
suma producto al inventario
registra movimientos
5. MÓDULO INVENTARIO

📦 INVENTARIO

Permite visualizar stock.

No se edita manualmente.

Pantalla

Inventario por producto.

Columnas

Producto
Stock horneado
Stock congelado
Stock en punto venta
Total
Botones
Ver detalle
Transferir estado
Transferir Estado

Permite mover producto.

Ejemplo

Congelado → Horneado
Formulario

Campos

Producto
Cantidad
Estado origen
Estado destino
Lógica del sistema

El sistema:

resta inventario origen
suma inventario destino
registra movimiento
6. MÓDULO VENTAS

📠 VENTAS

Registra salida de productos.

Pantalla

Lista de ventas.

Columnas

Fecha
Producto
Cantidad
Total
Canal
Botones
Nueva venta
Ver detalle
Nueva Venta

Formulario

Campos

Producto        → Selector
Cantidad        → Número
Precio venta    → Automático
Canal           → Selector
Lógica del sistema

Antes de guardar:

valida stock disponible

Si hay stock

descuenta inventario
registra venta
registra kardex
7. MÓDULO MERMAS

Permite registrar pérdidas.

Formulario

Campos

Producto
Cantidad
Motivo
Fecha

Motivos

Caducidad
Daño
Error producción
Devolución
Lógica

El sistema

descuenta inventario
registra pérdida
registra kardex
8. MÓDULO GASTOS

💸 GASTOS

Registro de gastos operativos.

Formulario

Campos

Fecha
Tipo gasto
Descripción
Monto
Lógica

Solo registra gasto.

No afecta inventario.

9. MÓDULO REPORTES

📊 REPORTES

Genera análisis.

Reportes disponibles
Inventario actual
Ventas por producto
Producción por fecha
Mermas
Utilidad
Productos por caducar
Lógica

El sistema consulta:

ventas
producción
compras
gastos
inventario

y calcula resultados.

10. FLUJO COMPLETO DEL SISTEMA

Operación diaria del negocio.

CONFIGURACIÓN
↓
COMPRAS
↓
ALMACÉN MP
↓
PRODUCCIÓN
↓
INVENTARIO PRODUCTO
↓
VENTAS
↓
REPORTES
11. OPERACIÓN DIARIA REAL (USUARIO)

En el día a día el usuario solo hace 3 acciones.

1 Comprar insumos
registrar compra
2 Producir
seleccionar producto
indicar cantidad
3 Registrar ventas
seleccionar producto
capturar cantidad

El sistema hace automáticamente:

control inventario
control costos
control caducidad
control utilidad

💡 Compa, te voy a decir algo importante.

Este documento que acabamos de crear ya es prácticamente el manual funcional de tu ERP.

Lo siguiente que deberíamos hacer (y esto es clave) es:

construir el MAPA VISUAL DEL SISTEMA

porque ahí aparecen cosas que todavía no vimos:

lotes

caducidad

inventario por ubicación

puntos de venta externos

y ese mapa te va a revelar 2 módulos que todavía no aparecen pero deberían existir.

Si quieres, en el siguiente paso te dibujo:

🧠 EL DIAGRAMA REAL DEL SISTEMA (tipo ERP industrial)

y te aseguro que te va a aclarar muchas decisiones antes de programar.










<!-- ***************** -->


📊 REPORTE OPERACIONAL DEL SISTEMA
Flujo de Operación del Usuario

Sistema de Control de Producción, Inventario y Ventas.

1. MÓDULO INICIO
(MENÚ PRINCIPAL)

Cuando el usuario abre el sistema entra a:

PANTALLA: MENU PRINCIPAL

Propósito:
Centro de navegación del sistema.

No guarda datos.

Solo dirige a los módulos.

Opciones visibles
⚙️ Configuración
🛒 Compras
🥣 Producción
📦 Inventario
📠 Ventas
💸 Gastos
📊 Reportes
2. MÓDULO CONFIGURACIÓN

⚙️ SETTINGS

Este módulo define las reglas del sistema.

Aquí se crean los catálogos.

No se mueve inventario.
No se mueve dinero.

Submenú
Categorias
Materia Prima
Productos
Recetas
Ubicaciones
2.1 SUBMÓDULO
CATEGORÍAS

Sirve para clasificar:

materia prima

productos

Pantalla

Lista de categorías.

Columnas visibles

Nombre
Tipo
Estado
Botones
Agregar
Editar
Eliminar
Volver
Formulario AGREGAR

Campos

Nombre           → Input texto
Tipo             → Selector (Materia Prima / Producto)
Activo           → Checkbox
Lógica del sistema

El sistema:

valida que no exista duplicado

genera ID interno

guarda registro

No afecta inventario.

2.2 SUBMÓDULO
MATERIA PRIMA

Aquí se registran todos los insumos.

Ejemplo:

harina
azúcar
mantequilla
chocolate
Pantalla

Tabla de materia prima.

Columnas

Nombre
Categoría
Unidad
Costo Promedio
Stock mínimo
Botones
Agregar
Editar
Eliminar
Ver inventario
Formulario AGREGAR

Campos

Nombre              → Texto
Categoría           → Lista desplegable
Unidad              → Selector (g / kg / pza / ml)
Stock mínimo        → Número
Activo              → Checkbox
Lógica del sistema

El sistema:

crea ID_MP

guarda registro

inicializa stock en 0

No modifica inventario.

2.3 SUBMÓDULO
PRODUCTOS

Define lo que se vende.

Ejemplo

galleta
brownie
nuvecita
pastel
Pantalla

Lista de productos.

Columnas

Nombre
Categoría
Precio venta
Vida útil
Congelable
Activo
Botones
Agregar
Editar
Eliminar
Administrar receta
Formulario AGREGAR PRODUCTO

Campos

Nombre                → Texto
Categoría             → Lista desplegable
Precio venta          → Moneda
Vida útil (días)      → Número
Congelable            → Checkbox
Activo                → Checkbox
Lógica del sistema

El sistema:

genera ID_PRODUCTO

guarda producto

permite vincular receta.

2.4 SUBMÓDULO
RECETAS

Define cómo se produce cada producto.

Pantalla

Lista de recetas por producto.

Columnas

Producto
Materia prima
Cantidad
Unidad
Botones
Agregar ingrediente
Eliminar
Guardar receta
Formulario

Campos

Producto            → Selección automática
Materia prima       → Lista desplegable
Cantidad            → Número
Unidad              → Automática
Lógica del sistema

El sistema:

vincula producto con insumo

permite múltiples ingredientes

Esto permitirá después:

calcular costo de producción
3. MÓDULO COMPRAS

🛒 COMPRAS

Aquí entra materia prima al negocio.

Pantalla principal

Lista de compras registradas.

Columnas

ID compra
Fecha
Proveedor
Total
Estado
Botones
Nueva compra
Ver detalle
Cerrar compra
Nueva Compra

Formulario encabezado

Campos

Fecha         → Fecha
Proveedor     → Texto
Estado        → Automático (Abierta)
Formulario líneas

Campos

Materia prima     → Selector
Cantidad          → Número
Costo unitario    → Moneda
Botones
Agregar línea
Eliminar línea
Cerrar compra
Lógica del sistema

Cuando se presiona Cerrar compra

El sistema:

suma stock a almacén MP
recalcula costo promedio
registra movimiento en kardex
4. MÓDULO PRODUCCIÓN

🥣 PRODUCCIÓN

Convierte materia prima en producto terminado.

Pantalla

Lista de producciones.

Columnas

Fecha
Producto
Cantidad
Estado
Botones
Nueva producción
Ver lote
Nueva Producción

Formulario

Campos

Producto            → Selector
Cantidad producir   → Número
Fecha producción    → Fecha
Destino inicial     → Selector (Congelado / Horneado)
Lógica del sistema

Cuando el usuario presiona PRODUCIR

El sistema ejecuta:

1 Leer receta

Busca ingredientes.

2 Calcular consumo
cantidad receta × cantidad producir
3 Validar inventario

Si falta materia prima:

producción bloqueada
4 Ejecutar producción

Si hay stock suficiente:

descuenta MP
crea lote
suma producto al inventario
registra movimientos
5. MÓDULO INVENTARIO

📦 INVENTARIO

Permite visualizar stock.

No se edita manualmente.

Pantalla

Inventario por producto.

Columnas

Producto
Stock horneado
Stock congelado
Stock en punto venta
Total
Botones
Ver detalle
Transferir estado
Transferir Estado

Permite mover producto.

Ejemplo

Congelado → Horneado
Formulario

Campos

Producto
Cantidad
Estado origen
Estado destino
Lógica del sistema

El sistema:

resta inventario origen
suma inventario destino
registra movimiento
6. MÓDULO VENTAS

📠 VENTAS

Registra salida de productos.

Pantalla

Lista de ventas.

Columnas

Fecha
Producto
Cantidad
Total
Canal
Botones
Nueva venta
Ver detalle
Nueva Venta

Formulario

Campos

Producto        → Selector
Cantidad        → Número
Precio venta    → Automático
Canal           → Selector
Lógica del sistema

Antes de guardar:

valida stock disponible

Si hay stock

descuenta inventario
registra venta
registra kardex
7. MÓDULO MERMAS

Permite registrar pérdidas.

Formulario

Campos

Producto
Cantidad
Motivo
Fecha

Motivos

Caducidad
Daño
Error producción
Devolución
Lógica

El sistema

descuenta inventario
registra pérdida
registra kardex
8. MÓDULO GASTOS

💸 GASTOS

Registro de gastos operativos.

Formulario

Campos

Fecha
Tipo gasto
Descripción
Monto
Lógica

Solo registra gasto.

No afecta inventario.

9. MÓDULO REPORTES

📊 REPORTES

Genera análisis.

Reportes disponibles
Inventario actual
Ventas por producto
Producción por fecha
Mermas
Utilidad
Productos por caducar
Lógica

El sistema consulta:

ventas
producción
compras
gastos
inventario

y calcula resultados.

10. FLUJO COMPLETO DEL SISTEMA

Operación diaria del negocio.

CONFIGURACIÓN
↓
COMPRAS
↓
ALMACÉN MP
↓
PRODUCCIÓN
↓
INVENTARIO PRODUCTO
↓
VENTAS
↓
REPORTES
11. OPERACIÓN DIARIA REAL (USUARIO)

En el día a día el usuario solo hace 3 acciones.

1 Comprar insumos
registrar compra
2 Producir
seleccionar producto
indicar cantidad
3 Registrar ventas
seleccionar producto
capturar cantidad

El sistema hace automáticamente:

control inventario
control costos
control caducidad
control utilidad

💡 Compa, te voy a decir algo importante.

Este documento que acabamos de crear ya es prácticamente el manual funcional de tu ERP.

Lo siguiente que deberíamos hacer (y esto es clave) es:

construir el MAPA VISUAL DEL SISTEMA

porque ahí aparecen cosas que todavía no vimos:

lotes

caducidad

inventario por ubicación

puntos de venta externos

y ese mapa te va a revelar 2 módulos que todavía no aparecen pero deberían existir.

Si quieres, en el siguiente paso te dibujo:

🧠 EL DIAGRAMA REAL DEL SISTEMA (tipo ERP industrial)

y te aseguro que te va a aclarar muchas decisiones antes de programar.



CFG_DATOS_NEGOCIO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1492935048#gid=1492935048
LST_UNIDADES_MEDIDA	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1343878836#gid=1343878836
LST_TIPO_GASTO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1343878836#gid=1343878836
LST_ESTADOS_PRODUCCION	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1752449946#gid=1752449946
LST_ESTADOS_INVENTARIO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=249325754#gid=249325754
LST_SABORES	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1987357739#gid=1987357739
LST_PRESENTACIONES	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1195461489#gid=1195461489
LST_TIPO_PRODUCTO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1646266190#gid=1646266190
CAT_MATERIA_PRIMA	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=116548526#gid=116548526
CAT_PRODUCTOS	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1464505346#gid=1464505346


PERO QUIERI QUE  botón CONFIGURACIÓN

Cuando presionas ⚙️ Configuración se despliega algo así:

Configuración
├── Datos del negocio
├── Listas maestras
└── Catálogos de operación

Cada uno abre su propio panel.
AL SELECCIONAR Datos del negocio

PANEL Panel Configuración  Datos del negocio
AL CAMPURAR INFO  SE GUARDE EN LA HOJA CFG_DATOS_NEGOCIO DEL ARCHIVO ERP_PRODUCCION_BASE
├── Datos del negocio#PANEL DONDE MUESTRE  ALGO COMO PERFIL. ESTE MODULO SOLO PERMITE TENER 1 PERFIL DE NEGOCIO
SI NO HAY DATOS REGISTRADOS ENTONCES SOLICITA LOS CAMPOS DE CONFIGURACION. Y SI YA EXISTE PERMITE EDITAR CAULQUIER DATO QUE SE SELECCIONE
MOSTRAR EL PANEL CON DATOS DE MANERA Y ESTUCTURADA Y STILIZADA. 
ID_CONFIG	GENERA AUTOMATICO OBLIGATORIO NO VISIBLE	
NOMBRE_NEGOCIO	VISIBLE OBLIGATORIO, FORMATO ENCABEZADO TEXTO MAS GRANDE 	
NOMBRE_RESPONSABLE	VISIBLE CAMPO OBLIGATORIO FOMATO DE DATOS NOMBRE	
TELEFONO	VISIBLE OBLIGATORIO, VALIDAR FOMATO DE TELEFONO CLIK MANDA A LLAMADA	
WHATSAPP	VISIBLE OBLIGATORIO, VALIDAR FOMATO DE TELEFONO CLIK MANDA  A WHATSSAP MENSAJE PRECARGADO	
EMAIL	VISIBLE OBLIGATORIO VALIDA FORMATO CORREO AL CLIK MANDA A ENVIAR CORREO	
MAPS_LINK	CAMPO OPCIONAL.  AL COLOCAR LINK NO MUESTRA TEXTO MUESTRA  MAPA ENVEVIDO DE PAS. CLIK LLEVA A MAPS	
FACEBOOK_LINK	CAMPO OPCIONAL AL COLOCAR MUESTRA  FACEBBOK ENBEBINO	
INSTAGRAM__LINK	CAMPO OPCIONAL AL COLOCAR MUESTRA  INTAGRAM  ENBEBINO	
TIKTOK	CAMPO OPCIONAL AL COLOCAR MUESTRA  TICKTOK ENBEBINO	
WEB_LINK	CAMPO OPCIONAL. MUESTRA  ENLACE PARA IR A SITIO WEB	
LOGO_URL	CAMPO OPCIONAL MUESTRA LOGO	
BANNER_URL	OPCIONAL MUETRA BANNER	
FECHA_ALTA	CAMPO OBLIGATORIO. SE CAPTURA CON FECHA ACTUAL CON OPCION DE CALENDARIO PARA CAMBIAR	
COMENTARIO	CAMPO OPCIONAL	
CFG_DATOS_NEGOCIO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1492935048#gid=1492935048
CON BOTONES CORREPONIDENTES PARA  EDITAR, AGRGRAR, ELIMINAR REGRESAR A LA PANTALLA ANTERIOR.

AL SELECCIONAR Listas maestras
MUESTRA PANEL Panel Configuración 
CON LAS OPCIONES PARA 
LST_UNIDADES_MEDIDA	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1343878836#gid=1343878836
ESTE PANEL MUESTRE LISTADO DE LAS LISTAS DE LA TABLAS AL AGREGAR NUEVO
ID_UNIDAD# SE CREA AUTOMATICO COSECUTIVO OBIGATORIO
NOMBRE  ENTRADA PARA INTRODUCIR NOMBRE MANUAL OBLIGATIOR NO PERMITE REPETIDOS 
ABREVIATURA ENTRADA PARA INTRODUCIR MANUALMANTE NO PERMITE DUPLICADOS VALIDA FORMATO UNIDAD DE MEDIDA
LST_TIPO_GASTO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1343878836#gid=1343878836
LST_ESTADOS_PRODUCCION	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1752449946#gid=1752449946
LST_ESTADOS_INVENTARIO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=249325754#gid=249325754
LST_SABORES	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1987357739#gid=1987357739
LST_PRESENTACIONES	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1195461489#gid=1195461489
LST_TIPO_PRODUCTO	https://docs.google.com/spreadsheets/d/1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY/edit?gid=1646266190#gid=1646266190
CON BOTONES CORREPONIDENTES PARA  EDITAR, AGRGRAR, ELIMINAR REGRESAR A LA PANTALLA ANTERIOR.



HABER  AQUI AL PRECIONAR CONFIGURACION   OCUPO QUE ME MUESTRE  LAS OPCIONES Configuración
├── Datos del negocio
├── Listas maestras
└── Catálogos de operación  
Cada uno abre su propio panel.

AL SELECCIONAR Datos del negocio   
MUESTRE  Panel Configuración  Datos del negocio Y CADA CAMPO  COLOQUE LOS DATOS 
QUE ESTAN REGISTRADOS EN LA HOJA DE GOOGLE SHEETS.

CON UN MENU SUPERIOR DONDE MUESTRE TITULO SE SECCION ACTUAL  PERL CONFIGURADO SIN DATOS O  SI YA ESTA CONFIGURADO
CON OPCIONES BOTONES 
AGREGAR PERFIL,EDITAR, AGRGRAR, ELIMINAR REGRESAR A LA PANTALLA ANTERIOR.