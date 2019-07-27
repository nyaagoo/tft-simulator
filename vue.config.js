const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");
const templateFunctionCurry = sizeSettingList => data => {
  let stringBuilder = "";
  stringBuilder = '.icon-A\n  background-image url("/I")\n  display inline-block\n'
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
  stringBuilder += data.sprites
    .map(sprite => {
      return ".icon-N\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx\n"
        .replace("N", sprite.name.toLowerCase())
        .replace("W", sprite.width)
        .replace("H", sprite.height)
        .replace("X", sprite.offset_x)
        .replace("Y", sprite.offset_y);
    })
    .join("");

  for (const setting of sizeSettingList) {
    const perSprite = data.sprites
      .map(sprite => {
        const scaledHeight = Number(setting.size) / sprite.height;
        const scaleWidth = Number(setting.size) / sprite.width;
        return ".icon-N-C\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx\n  background-size: Apx Bpx"
          .replace("N", sprite.name.toLowerCase())
          .replace("W", sprite.width * scaleWidth)
          .replace("H", sprite.height * scaledHeight)
          .replace("X", sprite.offset_x * scaleWidth)
          .replace("Y", sprite.offset_y * scaledHeight)
          .replace("A", spriteWidth * scaleWidth)
          .replace("B", spriteHeight * scaledHeight)
          .replace("C", setting.suffix);
      })
      .join("\n");
    stringBuilder += "\n" + perSprite;
  }

  return stringBuilder;
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
          function_based_template: templateFunctionCurry([
            { size: 16, suffix: "s" }
          ])
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
          function_based_template: templateFunctionCurry([
            { size: 16, suffix: "s" }
          ])
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
