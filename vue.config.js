const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");
const templateFunction = data => {
  const shared = '.icon-A\n  background-image url("/I")\n  display inline-block'
    .replace(
      "A",
      data.sprites[0].image
        .split("/")
        .pop()
        .split("-")
        .shift()
    )
    .replace("I", data.sprites[0].image);
  const spriteHeight = parseInt(data.spritesheet.px.height);
  const spriteWidth = parseInt(data.spritesheet.px.width);
  const scaleSmall = 0.5;
  const perSprite = data.sprites
    .map(sprite => {
      return (
        ".icon-N\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx"
          .replace("N", sprite.name.toLowerCase())
          .replace("W", sprite.width)
          .replace("H", sprite.height)
          .replace("X", sprite.offset_x)
          .replace("Y", sprite.offset_y) +
        "\n.icon-N-s\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx\n  background-size: Apx Bpx;"
          .replace("N", sprite.name.toLowerCase())
          .replace("W", sprite.width * scaleSmall)
          .replace("H", sprite.height * scaleSmall)
          .replace("X", sprite.offset_x * scaleSmall)
          .replace("Y", sprite.offset_y * scaleSmall)
          .replace("A", spriteWidth * scaleSmall)
          .replace("B", spriteHeight * scaleSmall)
      );
    })
    .join("\n");
  return shared + "\n" + perSprite;
};
const templateFunction2 = data => {
  const shared = '.icon-A\n  background-image url("/I")\n  display inline-block'
    .replace(
      "A",
      data.sprites[0].image
        .split("/")
        .pop()
        .split("-")
        .shift()
    )
    .replace("I", data.sprites[0].image);
  const spriteHeight = parseInt(data.spritesheet.px.height);
  const spriteWidth = parseInt(data.spritesheet.px.width);
  const scaleSmall = 3 / 4;
  const perSprite = data.sprites
    .map(sprite => {
      return (
        ".icon-N\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx"
          .replace("N", sprite.name.toLowerCase())
          .replace("W", sprite.width)
          .replace("H", sprite.height)
          .replace("X", sprite.offset_x)
          .replace("Y", sprite.offset_y) +
        "\n.icon-N-s\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx\n  background-size: Apx Bpx;"
          .replace("N", sprite.name.toLowerCase())
          .replace("W", sprite.width * scaleSmall)
          .replace("H", sprite.height * scaleSmall)
          .replace("X", sprite.offset_x * scaleSmall)
          .replace("Y", sprite.offset_y * scaleSmall)
          .replace("A", spriteWidth * scaleSmall)
          .replace("B", spriteHeight * scaleSmall)
      );
    })
    .join("\n");
  return shared + "\n" + perSprite;
};
module.exports = {
  configureWebpack: {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/class"),
          glob: "*.png"
        },
        customTemplates: {
          function_based_template: templateFunction
        },
        target: {
          image: path.resolve(__dirname, "public/img/class-sprite.png"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-class.styl"),
              { format: "function_based_template" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/class-sprite.png"
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/origin"),
          glob: "*.png"
        },
        customTemplates: {
          function_based_template: templateFunction
        },
        target: {
          image: path.resolve(__dirname, "public/img/origin-sprite.png"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-origin.styl"),
              { format: "function_based_template" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/origin-sprite.png"
        }
      })
      /*
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/champion"),
          glob: "*.jpg"
        },
        customTemplates: {
          function_based_template: templateFunction2
        },
        target: {
          image: path.resolve(__dirname, "public/img/champion-sprite.jpg"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-champion.styl"),
              { format: "function_based_template" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/champion-sprite.png"
        }
      })*/
    ],
    resolve: {
      modules: ["node_modules"]
    }
  }
};
