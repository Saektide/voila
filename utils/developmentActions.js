export const developmentActions = [
  {
    name: 'modalTest',
    title: 'Test de ventana modal',
    summary: 'Invoca una ventana modal de ejemplo para probar las funcionalidades de ella.',
    handler (Vue) {
      Vue.$modals.invoke({
        title: '¡Hola!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        actions: [
          {
            role: 'secondary',
            level: 'normal',
            label: 'Cerrar',
            dismiss: true
          },
          {
            role: 'primary',
            level: 'normal',
            label: 'Proceder'
          }
        ]
      })
    }
  }
]
