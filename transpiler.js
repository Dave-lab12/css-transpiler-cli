
import glob from "glob"
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import fs from "fs"
import atImport from "postcss-import"
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano'

export const transpile = (filePath, spinner) => {
    const hangleTranspile = new Promise((resolve, reject) => {
        spinner.start()

        glob(`${filePath}/**/*.css`, function (er, files) {
            files.map(cssFile => {
                const css = fs.readFileSync(cssFile, "utf8")
                const fileName = path.parse(cssFile).name
                const singlePath = path.dirname(cssFile)
                if (!fs.existsSync(`${singlePath}/${fileName}.old`)) {
                    fs.renameSync(cssFile, `${singlePath}/${fileName}.old`)
                }

                postcss()
                    .use(atImport())
                    .use(cssnano())
                    .use(postcssPresetEnv())
                    .use(autoprefixer())
                    .process(css, {
                        from: cssFile
                    })
                    .then((result) => {
                        const singlePath = path.dirname(cssFile)
                        const output = result.css
                        const fileName = path.parse(cssFile).name
                        fs.writeFileSync(`${singlePath}/${fileName}.css`, output);
                    }).catch(err => {
                        reject("something went wrong")
                    })
            })
            resolve(true)
        })
    }).then(res => {
        spinner.success({ text: `Completed 🚀` })
    })
}