#!usr/bin/env node

import chalk from 'chalk'
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation"
import path from 'path';
import { createSpinner } from "nanospinner";
import { transpile } from './transpiler.js';

let data;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))
const spinner = createSpinner("compiling css 🔥")
async function work() {
    const rainbowTitle = chalkAnimation.rainbow(
        "optimize your css with this tool 🪐 \n"
    )
    await sleep()
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue('How to use this tool')}
1.Locate folder which contains css to transpile 
2.Give the folder directory to the prompt (if noting provided it will default to the dir the app is launched)
3.The tool looks for files recursively so beware
4.It stores old css file using {filename}.old.css
    `)
}
await work()

async function getPath() {
    const cssPath = await inquirer.prompt({
        name: "cssLocation",
        type: "input",
        message: "Location to your css files",
        default() {
            return path.dirname("")
        }
    })
    data = cssPath
}

await getPath()

transpile(data.cssLocation, spinner)