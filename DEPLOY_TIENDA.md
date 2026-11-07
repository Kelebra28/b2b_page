# Subir la tienda (web + CRM) — lista de pasos

> Estado al 6 nov 2026. **Nada de esto está en git ni desplegado todavía.** Este archivo no lleva contraseñas ni llaves.

## 0. Orden (importa)
1. **CRM primero** (la web lo consulta al construirse).
2. **Web** en una URL de prueba de Vercel (`*.vercel.app`, con `SITE_NOINDEX=1`).
3. Probar todo (ver sección 5).
4. Recién entonces, el corte de DNS de `laserinova.com` (ver `MIGRATION_PLAN.md`). Hoy `laserinova.com` sigue sirviendo el sitio viejo desde Hostinger.

## 1. Qué hay que subir a git

### CRM (repo `Kelebra28/CRM_LaserInova`) — SÍ subir
- `src/app/api/public/**` (categories, products, products/[model], products/[model]/stock, quote-requests) — **el API público completo está sin rastrear en git**
- `src/lib/public-api.ts`
- `src/server/services/doblevela.service.ts`
- `scripts/mirror-catalog-images.ts` y `scripts/mirror-color-images.ts` (opcional: sirven para bajar fotos)

NO subir: `scratch/*` (scripts de prueba), `.env`, `scratch/catalog-img/` (ya ignorados). `.gitignore` y `CLAUDE.md` aparecen modificados desde antes: revísalos tú.

### Web (repo `Kelebra28/b2b_page`) — SÍ subir
- La carpeta **`web/` completa** (aparece sin rastrear: ~338 archivos). `.env.local`, `node_modules`, `.next` y el enlace `public/catalog-preview` ya están ignorados.
- Ojo: en la raíz hay ~47 cambios del sitio viejo (HTML, favicons) que no son de la tienda: decide tú si van en el mismo commit.

## 2. Vercel — proyecto del CRM (app.laserinova.com)
Agregar en Settings → Environment Variables (Production):

| Variable | Valor |
|---|---|
| `PUBLIC_API_KEY` | llave nueva de **32+ caracteres** (la misma que irá en la web como `CATALOG_API_KEY`) |
| `PUBLIC_STORE_CATEGORIES` | la lista de abajo (76 categorías) |
| `PUBLIC_STORE_SHOW_STOCK` | `true` |
| `PUBLIC_QUOTE_USER_IDS` | `027463e5-015f-4383-a547-0cdd553674b6,395cfaf9-538f-4691-9c90-30fc662b3b77` (Ricardo, Raúl; se reparten por turnos) |
| `PUBLIC_IMAGE_BASE` | `https://img.laserinova.com` |

Ya deberían existir: `DATABASE_URL`, `DOBLE_VELA_KEY`.
**No poner:** `PUBLIC_IMAGE_DIR` (en Vercel no hay esa carpeta), `PUBLIC_STORE_SHOW_PRICES` (precios apagados).
**`PUBLIC_COLOR_IMAGES`**: dejar SIN poner hasta que se suban todas las fotos de color (ver sección 4); sin ella el API no publica fotos de color y no hay miniaturas rotas.

Valor de `PUBLIC_STORE_CATEGORIES`:
```
memos-y-adhesivos,hieleras-y-loncheras,agendas-y-agendarios,laminas,porta-documentos,sets-para-oficina,recreacion,articulos-para-viaje,lapices,libretas,ventiladores,tequileros,accesorios,-ninguna-subfamilia-,termos,herramientas,audifonos-y-bocinas,bolsas,gourmet,bar,carpetas,accesorios-para-viaje,chalecos,flexometro,textil,llaveros-de-plastico,bebidas,bbq,tazas-y-tarros,accesorios-de-cocina,alcancias,articulos-escolares,relojes,boligrafos-ecologicos,portagafetes,estuches-para-boligrafos,cilindros-de-vidrio,cilindros-plasticos,peluche,cables-y-cargadores,crayolas,cajas-para-tazas,accesorios-celular-y-tablet,antiestres,popotes,tazas-y-termos,varios,accesorios-de-computo,accesorios-para-vino,accesorios-de-escritorio,mascotas,maletines,maletas,brazaletes,llaveros,accesorios-para-hogar,calculadoras,cuidado-personal,salud,boligrafos-resaltadores,paraguas-e-impermeables,cilindros-metalicos,linternas,infantil,vasos,tecnologia,boligrafos-metalicos,belleza,baterias,vasos-y-tequileros,gorras,set-de-boligrafos,boligrafos-plasticos,mochilas,accesorios-auto,morrales
```

## 3. Vercel — proyecto de la web
New Project → importar `b2b_page` → **Root Directory = `web`** (Next.js). Variables:

| Variable | Valor |
|---|---|
| `CATALOG_API_URL` | `https://app.laserinova.com` |
| `CATALOG_API_KEY` | la misma llave que `PUBLIC_API_KEY` del CRM |
| `RESEND_API_KEY` | tu llave de Resend |
| `CONTACT_FROM` | `no-reply@laserinova.com` |
| `CONTACT_TO` | `informes@laserinova.com` (aquí llegan los avisos de solicitudes) |
| `SITE_NOINDEX` | `1` **solo en Preview**; quitar en Production |

## 4. Fotos (img.laserinova.com, ya creado en Hostinger)
- Subidas: **1,044 fotos de modelo** (falta `tl9749-mate`, da 404 en el proveedor).
- **Sin subir:** ~1,491 fotos de color ya descargadas en `scratch/catalog-img/*--*.webp` (la descarga de las 2,262 quedó pausada).
- Mientras no se suban, la ficha muestra solo la foto general. Para activarlas: subir las de color, poner `PUBLIC_COLOR_IMAGES=true` en el CRM.

## 5. Pruebas en la URL de Vercel antes del corte
- [ ] `/tienda`, una categoría, una ficha de Doble Vela y una de Promo Opción (ej. `/tienda/producto/tmps-195`).
- [ ] Existencia "en tiempo real" en una ficha de Doble Vela (si no aparece la etiqueta, revisar `DOBLE_VELA_KEY` y la salida a internet del CRM).
- [ ] Carrito: agregar, cantidad 0 bloquea, formulario, `422` con solo el nombre.
- [ ] **Solicitud real de punta a punta** (crea cliente + cotización `WEB-…` en el CRM y manda correo): hacerla una vez y borrar el registro de prueba.
- [ ] Que el primer arranque en frío del CRM no dé error (la primera petición tarda ~3 s).
- [ ] Formulario de contacto (correo real) y que `/robots.txt` diga `Disallow: /` en Preview.

## 6. Riesgos y pendientes conocidos
- **Resend:** el dominio `laserinova.com` estaba "en proceso" de verificación; sin él los correos de aviso no salen (la solicitud sí se registra en el CRM).
- **Base de Hostinger:** el API del CRM ya guarda una copia del catálogo en memoria (10 min) y de ahí salen la lista, las categorías y las fichas: una sola lectura a la base cada 10 min por instancia (antes, una lectura completa por página). Al arrancar en frío, 18 peticiones simultáneas tardan ~3 s y cuestan una lectura.
- **Doble Vela:** `GetExistenciaAll` solo de 8 PM a 8 AM; este código **no la usa**. `GetExistencia` (por modelo) está permitida las 24 h.
- **Promo Opción:** 3 logins por correo cada 24 h. Nada de lo nuevo la llama.
- Los topes y cachés de memoria (existencias, formulario) son **por instancia** en Vercel.
- En Hostinger quedó una carpeta vacía `public_html/public_html` y un `default.php` en `img/`: se pueden borrar a mano.
