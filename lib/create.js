const path = require("path")
const fs = require("fs-extra")
const inquirer = require("inquirer")
const Creator = require("./Creator")

module.exports = async function(appName,options) {
  const cwd = process.cwd()
  const targetDir = path.join(cwd,appName)
  if(fs.existsSync(targetDir)) {
    while(true) {
      if(options.force) {
        console.log(`\r\nRemoving: ${targetDir}`)
        await fs.remove(targetDir)
        break
      } else {
        const { action } = await inquirer.prompt([
          {
            name: `action`,
            type: `list`,
            message: `Target directory already exists Pick an action:`,
            choices: [
              {name: `Overwrite`,value: true},
              {name: `Cancel`,value: false}
            ]
          }
        ])
        if(!action) {
          return
        }
        options.force = action
      }
    }
  }
  fs.mkdirSync(targetDir)
  new Creator(appName,targetDir).create()
}