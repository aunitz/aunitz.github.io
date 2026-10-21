// Procesa las imágenes en bruto de un post nuevo y las deja en img/ con el
// tamaño y el formato que usa el blog. Uso, desde la raíz del repositorio:
//
//   node .claude/skills/publish-post-blog-aunitz/scripts/procesar-imagenes.mjs plan.json
//
// plan.json:
//   {
//     "outDir": "img",
//     "sobrescribir": false,
//     "items": [
//       { "src": "C:/ruta/captura.png", "name": "slug-01", "tipo": "xl" },
//       { "src": "C:/ruta/cabecera.jpg", "name": "post-bg-122", "tipo": "cabecera", "posicion": "top" }
//     ]
//   }
//
// Tipos (si se omite, se deduce: svg por extensión, animacion si es vídeo o
// tiene más de un fotograma, normal en el resto):
//   normal     WebP de 750 px de ancho como máximo, sin ampliar nunca
//   xl         lo mismo, más NAME-xl.webp de hasta 1600 px para abrir a pantalla completa
//   movil      captura vertical de móvil: WebP de 360 px de ancho
//   animacion  WebM VP9 sin audio de 750 px como máximo (necesita ffmpeg en el PATH)
//   svg        se copia tal cual; solo se calculan las dimensiones que declarar
//   cabecera   JPG recortado a 1500×474 (header-img)
//   og         JPG recortado a 1200×630 (og-image para LinkedIn y X)
// "posicion" (cabecera y og): centre (por defecto), top, bottom, left, right,
// attention o entropy; es el gravity de sharp para decidir qué parte se recorta.
//
// Escribe en stdout un JSON con, por cada imagen, el src, las dimensiones que
// hay que declarar en el HTML, el fichero -xl si lo hay, la duración en
// segundos si es una animación y el peso en bytes.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ANCHO = 750;
const ANCHO_XL = 1600;
const ANCHO_MOVIL = 360;
const WEBP = { quality: 80, effort: 6 };
const JPEG = { quality: 80, mozjpeg: true, progressive: true };
const VIDEO = new Set(['.gif', '.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v']);

const plan = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const outDir = plan.outDir || 'img';
const resultados = [];
const errores = [];

const peso = f => fs.statSync(f).size;
const rel = f => path.relative(process.cwd(), f).split(path.sep).join('/');

function destino(nombre) {
    const f = path.join(outDir, nombre);
    if (fs.existsSync(f) && !plan.sobrescribir) {
        throw new Error(`${rel(f)} ya existe; no se sobrescribe sin "sobrescribir": true`);
    }
    return f;
}

async function tipoDe(item) {
    if (item.tipo) return item.tipo;
    const ext = path.extname(item.src).toLowerCase();
    if (ext === '.svg') return 'svg';
    if (VIDEO.has(ext) && ext !== '.gif') return 'animacion';
    const meta = await sharp(item.src, { animated: true }).metadata();
    return (meta.pages || 1) > 1 ? 'animacion' : 'normal';
}

// WebP de como mucho `ancho` px; devuelve las dimensiones reales del fichero
async function webp(src, out, ancho) {
    const info = await sharp(src).rotate()
        .resize({ width: ancho, withoutEnlargement: true })
        .webp(WEBP).toFile(out);
    return { width: info.width, height: info.height };
}

async function recorte(src, out, width, height, posicion = 'centre') {
    const meta = await sharp(src).rotate().metadata();
    const info = await sharp(src).rotate()
        .resize({ width, height, fit: 'cover', position: posicion })
        .jpeg(JPEG).toFile(out);
    const aviso = (meta.autoOrient?.width ?? meta.width) < width || (meta.autoOrient?.height ?? meta.height) < height
        ? `el original (${meta.width}×${meta.height}) es más pequeño que ${width}×${height}: se ha ampliado y puede verse borroso`
        : null;
    return { width: info.width, height: info.height, aviso };
}

function ffmpeg(src, out) {
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-an',
        '-vf', `scale='trunc(min(${ANCHO},iw)/2)*2':-2:flags=lanczos,format=yuv420p`,
        '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', '-deadline', 'good', out]);
    const [w, h] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height', '-of', 'csv=p=0', out]).toString().trim().split(',');
    // La duración la da el original: el WebM recién escrito no siempre la lleva en la cabecera
    const duracion = parseFloat(execFileSync('ffprobe', ['-v', 'error',
        '-show_entries', 'format=duration', '-of', 'csv=p=0', src]).toString()) || null;
    return { width: +w, height: +h, duracion };
}

for (const item of plan.items) {
    try {
        if (!fs.existsSync(item.src)) throw new Error(`no existe el fichero ${item.src}`);
        const tipo = await tipoDe(item);
        const r = { name: item.name, tipo, original: item.src };
        if (tipo === 'normal' || tipo === 'movil') {
            const out = destino(`${item.name}.webp`);
            Object.assign(r, await webp(item.src, out, tipo === 'movil' ? ANCHO_MOVIL : ANCHO), { src: rel(out) });
        } else if (tipo === 'xl') {
            const out = destino(`${item.name}.webp`);
            const outXl = destino(`${item.name}-xl.webp`);
            Object.assign(r, await webp(item.src, out, ANCHO), { src: rel(out) });
            const xl = await webp(item.src, outXl, ANCHO_XL);
            Object.assign(r, { xl: rel(outXl), xlWidth: xl.width, xlHeight: xl.height, xlBytes: peso(outXl) });
            if (xl.width < ANCHO * 1.5) r.aviso = `el original solo mide ${xl.width} px de ancho: la versión -xl apenas aporta detalle; mejor tipo normal`;
        } else if (tipo === 'animacion') {
            const out = destino(`${item.name}.webm`);
            Object.assign(r, ffmpeg(item.src, out), { src: rel(out) });
        } else if (tipo === 'svg') {
            const out = destino(`${item.name}.svg`);
            fs.copyFileSync(item.src, out);
            const meta = await sharp(item.src).metadata();
            const width = Math.min(meta.width, ANCHO);
            Object.assign(r, { src: rel(out), width, height: Math.round(meta.height * width / meta.width) });
        } else if (tipo === 'cabecera' || tipo === 'og') {
            const [w, h] = tipo === 'cabecera' ? [1500, 474] : [1200, 630];
            const out = destino(`${item.name}.jpg`);
            const { aviso, ...dim } = await recorte(item.src, out, w, h, item.posicion);
            Object.assign(r, dim, { src: rel(out) });
            if (aviso) r.aviso = aviso;
        } else {
            throw new Error(`tipo desconocido: ${tipo}`);
        }
        r.bytes = peso(path.join(process.cwd(), r.src));
        resultados.push(r);
    } catch (e) {
        errores.push({ name: item.name, src: item.src, error: e.message.split('\n')[0] });
    }
}

console.log(JSON.stringify({ resultados, errores }, null, 2));
process.exitCode = errores.length ? 1 : 0;
