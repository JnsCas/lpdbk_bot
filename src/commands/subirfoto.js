module.exports = {
  name: 'subirfoto',
  handle: (ctx) => {
    ctx.reply(`Para subir una foto, responde este mensaje con la foto a subir y en la descripción ingresa la categoría de la misma.\nPor el momento, las categorías existentes son:\n- diego\n- asados`);
  }
};