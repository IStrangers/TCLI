const inquirer = require("inquirer")
const {
  fetchRepoList, fetchTagList
} = require("./request.js")
const { wrapLoading } = require("./util.js")
const downloadGitRepo = require("download-git-repo")
const util = require("util")

class Creator {

  constructor(appName,targetDir) {
    this.appName = appName
    this.targetDir = targetDir
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  async create() {
    const repo = await this.fetchRepo()
    const tag = await this.fetchTag(repo)
    await this.download(repo,tag)

  }

  async fetchRepo() {
    const repos = await wrapLoading(fetchRepoList,`waiting fetch template...`)
    const reposNameList = repos.filter(item => item.name.startsWith(`TCL-`) && item.name.endsWith(`-Template`))
    .map(item => {return {name: item.name,value: item.name}})
    if(!reposNameList || reposNameList.length <= 0) {
      console.log(`No template optional`)
      return
    }

    const { repo } = await inquirer.prompt([{
      name: `repo`,
      type: 'list',
      message: `please choice a template to create project:`,
      choices: reposNameList
    }])
    return repo
  }

  async fetchTag(repo) {
    const tags = await wrapLoading(() => fetchTagList(repo),`waiting fetch tags...`)
    if(!tags || tags.length <= 0) {
      console.log(`No tag optional`)
      return
    }
    const tagsNameList = tags.map(item => {return {name: item.name,value: item.name}})
    const { tag } = await inquirer.prompt([{
      name: `tag`,
      type: 'list',
      message: `please choice a tag to create project:`,
      choices: tagsNameList
    }])
    return tag
  }

  async download(repo,tag) {
    const requestUrl = ``;
    
  }

}

module.exports = Creator