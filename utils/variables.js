/**
 * @typedef {Object} Feature
 * @property {string} name
 * @property {string} description
 * @property {boolean} inDevelopment
 * @property {boolean} [requireClass]
 */

/**
 * @typedef {'cleanInterface' | 'expirationByCandle' | 'keyboardShortcuts' | 'superCleanMode' | 'priceNotificationNavigation' | 'deepDarkMode' | 'timeframeHotkeys'} FeatureKeys
 */

/** @type {Record<FeatureKeys, Feature>} */
const features = {
  cleanInterface: {
    name: 'Modo interfaz limpia',
    description: 'Oculta algunos paneles y elementos del broker para dejar el gráfico más limpio.',
    inDevelopment: false,
    requireClass: true
  },
  expirationByCandle: {
    name: 'Expiración al cierre de vela',
    description: 'Ajusta automáticamente el tiempo de expiración a finalización de vela en 1m.',
    inDevelopment: false
  },
  keyboardShortcuts: {
    name: 'Atajos de teclado para activos',
    description: `Permite cambiar entre los activos abiertos usando atajos de teclado. Usa <b>Ctrl + 1</b> para ir al primer activo y <b>Ctrl + 2</b> para el segundo etc.`,
    inDevelopment: false
  },
  superCleanMode: {
    name: 'Modo super limpio (Backtesting)',
    description: 'Oculta casi todos los paneles del broker dejando solo el gráfico y los activos abiertos. Ideal para análisis o backtesting visual.',
    inDevelopment: false,
    requireClass: true
  },
  priceNotificationNavigation: {
    name: 'Navegar desde notificaciones',
    description: 'Permite hacer clic en las notificaciones de precio para abrir automáticamente el activo donde se generó la alerta.',
    inDevelopment: false,
    requireClass: true
  },
  deepDarkMode: {
    name: 'Modo oscuro profundo',
    description: 'Aplica un tema aún más oscuro al broker para reducir el brillo y mejorar la concentración durante el trading.',
    inDevelopment: false,
    requireClass: true
  },
  hideMarketSentiment: {
    name: "Ocultar sentimiento del mercado",
    description: "Oculta la barra vertical que muestra el porcentaje de traders en cada dirección.",
    requireClass: true
  },
  timeframeHotkeys: {
    name: 'Atajos para temporalidades',
    description: 'Permite cambiar la temporalidad del gráfico usando atajos de teclado. Usa <b>Alt + 1</b> para ir a 5s <b>Ctrl + 2</b> para 10s, etc.'
  }
  // blockLast30sOfCandle: {
  //   name: 'Bloqueo en últimos 30s de vela',
  //   description: 'Deshabilita los botones de compra y venta durante los últimos 30 segundos de la vela actual para evitar operar en la siguiente vela, solo temporalidad de 1m.',
  //   inDevelopment: true
  // },
}

/**
 * @type {[keyof typeof features]}
 */
const featureKeys = Object.keys(features)

/** @type {{ [K in keyof typeof features]: boolean }} */
let featureStates = {}

featureKeys.forEach(key => {
  featureStates[key] = false
})

/** @type {'light' | 'dark' | 'black'} */
let theme = 'black'

let prevDeepDarkMode = false
