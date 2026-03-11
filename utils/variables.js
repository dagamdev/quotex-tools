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
  blockLast30sOfCandle: {
    name: 'Bloqueo en últimos 30s de vela',
    description: 'Deshabilita los botones de compra y venta durante los últimos 30 segundos de la vela actual para evitar operar en la siguiente vela, solo temporalidad de 1m.',
    inDevelopment: true
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
  }
}

/** @type {{ [K in keyof typeof features]: boolean }} */
let featureStates = {}

/** @type {'light' | 'dark' | 'black'} */
let theme
