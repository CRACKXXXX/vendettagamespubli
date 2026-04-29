# Vendetta Games II - Evento Clandestino

![Vendetta Games](assets/images/bg/background.png)

Página de anuncio y cartelera interactiva para el evento **Vendetta Games II**, diseñada específicamente para ser visualizada dentro del navegador integrado (CEF) de **FiveM**.

## 🎨 Estética y Diseño
El proyecto presenta una atmósfera oscura, tétrica y muy elegante. Destaca por el uso de colores negros profundos, grises oscuros y acentos en rojo sangre y dorado.

### Características Visuales:
- **Resolución Forzada:** El diseño está anclado a `1920x1080px` sin media queries (`overflow: hidden`), garantizando que se vea exactamente como un cartel de cine a pantalla completa en el juego.
- **Tipografía Premium:** Uso de la familia tipográfica *Cinzel* para aportar un toque clásico, misterioso y solemne.
- **Efectos y Animaciones:**
  - **Partículas de brasa (Embers):** Generadas dinámicamente con JavaScript y animadas con CSS puro para no afectar el rendimiento.
  - **Shimmer Diagonal:** Un sutil barrido de luz sobre el título principal.
  - **Scanline Overlay:** Un efecto de pantalla antigua que recorre sutilmente la página de arriba a abajo.
  - **Contador Dinámico:** Cuenta regresiva hacia el 16 de mayo de 2026 con un efecto visual de "flip" al cambiar los números.
  - **Interacciones Hover:** Destellos dorados en precios y revelación a color de los patrocinadores.

## 🛠️ Tecnologías Utilizadas
Este proyecto está construido **100% en Vanilla** para asegurar la máxima ligereza y rendimiento dentro del entorno restringido del CEF de FiveM.

- **HTML5** (Estructura semántica limpia)
- **CSS3** (Animaciones por Keyframes, Flexbox, Grid, sin librerías externas)
- **JavaScript (ES5/ES6)** (Lógica del temporizador y generación de partículas, sin frameworks)

## 📂 Estructura de Archivos
El proyecto está organizado de la siguiente manera para un fácil mantenimiento:

```text
vendettagamespubli/
├── index.html                   # Documento principal
├── README.md                    # Este archivo
└── assets/
    ├── css/
    │   └── styles.css           # Estilos principales y animaciones
    ├── js/
    │   └── main.js              # Lógica de cuenta regresiva y partículas
    └── images/
        ├── bg/                  # Imágenes de fondo
        └── sponsors/            # Logos de patrocinadores
```

## 🚀 Despliegue
Para visualizar el proyecto localmente, simplemente abre `index.html` en cualquier navegador web moderno, o sírvelo a través de un servidor HTTP local (como Live Server en VSCode o `python -m http.server`).

Para FiveM, simplemente integra esta carpeta dentro de tu recurso UI (NUI) y llama al `index.html`.

---
*Diseñado para la comunidad de Roleplay.*
