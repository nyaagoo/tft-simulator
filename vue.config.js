const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");
const templateFunction = function (data) {
  const shared = '.icon\n  background-image url("/I")\n  display inline-block'
      .replace('I', data.sprites[0].image);
  const perSprite = data.sprites.map(function (sprite) {
      return '.icon-N\n  width Wpx\n  height Hpx\n  background-position Xpx Ypx'
          .replace('N', sprite.name.toLowerCase())
          .replace('W', sprite.width)
          .replace('H', sprite.height)
          .replace('X', sprite.offset_x)
          .replace('Y', sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
};
module.exports = {
  configureWebpack: {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico"),
          glob: "*.png"
        },
        customTemplates: {
          "function_based_template": templateFunction
        },
        target: {
          image: path.resolve(
            __dirname,
            "public/img/champion-sprite.png"
          ),
          css: [[path.resolve(__dirname, "src/sprite.styl"), {format: "function_based_template"}]]
        },
        apiOptions: {
          cssImageRef: "img/champion-sprite.png"
        }
      })
    ],
    resolve: {
      modules: ["node_modules"]
    }
  }
};

