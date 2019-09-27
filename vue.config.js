const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");

const spriteTemplate = setting => data => {
  // setting: {suffix: string}
  const iconTotalCount = data.sprites.length;
  let stringBuilder = "";
  stringBuilder += '.icon-A\n  height Hpx\n  width Wpx\n  display: inline-block\n  max-width 100%\n  background-image url("/I")\n  background-size 100%\n'
    .replace("A", setting.suffix)
    .replace("I", data.sprites[0].image)
    .replace("H", data.sprites[0].height)
    .replace("W", data.sprites[0].width);

  stringBuilder += data.sprites
    .map((sprite, index) => {
      return ".icon-N\n  background-position 0 Y%\n"
        .replace("N", sprite.name.toLowerCase())
        .replace("Y", (100 / (iconTotalCount - 1)) * index);
    })
    .join("");
  return stringBuilder;
};

module.exports = {
  configureWebpack: {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/champion"),
          glob: "*.jpg"
        },
        customTemplates: {
          spriteFunctionChampion: spriteTemplate({ suffix: "champion" })
        },
        target: {
          image: path.resolve(__dirname, "src/ico/sprite/champion-sprite.jpg"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-champion.styl"),
              { format: "spriteFunctionChampion" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/sprite/champion-sprite.jpg"
        },
        spritesmithOptions: {
          algorithm: "top-down"
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/skill"),
          glob: "*.jpg"
        },
        customTemplates: {
          spriteFunctionSkill: spriteTemplate({ suffix: "skill" })
        },
        target: {
          image: path.resolve(__dirname, "src/ico/sprite/skill-sprite.jpg"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-skill.styl"),
              { format: "spriteFunctionSkill" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/sprite/skill-sprite.jpg"
        },
        spritesmithOptions: {
          algorithm: "top-down"
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/item"),
          glob: "*.jpg"
        },
        customTemplates: {
          spriteFunctionItem: spriteTemplate({ suffix: "item" })
        },
        target: {
          image: path.resolve(__dirname, "src/ico/sprite/item-sprite.jpg"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-item.styl"),
              { format: "spriteFunctionItem" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/sprite/item-sprite.jpg"
        },
        spritesmithOptions: {
          algorithm: "top-down"
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/class"),
          glob: "*.png"
        },
        customTemplates: {
          spriteFunctionClass: spriteTemplate({ suffix: "class" })
        },
        target: {
          image: path.resolve(__dirname, "src/ico/sprite/class-sprite.png"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-class.styl"),
              { format: "spriteFunctionClass" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/sprite/class-sprite.png"
        },
        spritesmithOptions: {
          algorithm: "top-down"
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "src/ico/origin"),
          glob: "*.png"
        },
        customTemplates: {
          spriteFunctionOrigin: spriteTemplate({ suffix: "origin" })
        },
        target: {
          image: path.resolve(__dirname, "src/ico/sprite/origin-sprite.png"),
          css: [
            [
              path.resolve(__dirname, "src/style/sprite-origin.styl"),
              { format: "spriteFunctionOrigin" }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "img/sprite/origin-sprite.png"
        },
        spritesmithOptions: {
          algorithm: "top-down"
        }
      }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './public/index.html'),
          path.join(__dirname, './src/**/*.vue'),
          path.join(__dirname, './src/**/*.js'),
          path.join(__dirname, './src/**/*.ts'),
          path.join(__dirname, './node_modules/vuetify/dist/vuetify.js')
        ]),
        whitelistPatterns: [/^icon/]
      })
    ],
    resolve: {
      modules: ["node_modules"]
    }
  }
};
