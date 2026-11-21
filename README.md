# MotoTrack

Base de una PWA para llevar el control del mantenimiento de una moto. La primera pantalla es solo una bienvenida; la interfaz de gestión y su lógica se añadirán más adelante.

## Empezar

Requiere Node.js `>=22.23.4`.

```sh
npm install
npm run dev
```

Para generar la versión de producción:

```sh
npm run build
npm run preview
```

## Supabase

1. Copia `.env.example` a `.env`.
2. Sustituye `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` por la URL del proyecto y su clave pública (publishable/anon) de Supabase.
3. Usa `getSupabaseClient()` desde `src/lib/supabase.ts` cuando se implemente la lógica de datos.

Las variables `PUBLIC_` se incluyen en el cliente del navegador. No pongas una clave `service_role` aquí; configura las políticas RLS de Supabase antes de permitir acceso a datos.

## PWA

La aplicación tiene un manifiesto con modo `standalone`, iconos de instalación y un service worker que conserva la pantalla inicial para abrirla sin conexión. Sirve la aplicación por HTTPS en producción (localhost también es válido durante el desarrollo) para instalarla en un dispositivo.
