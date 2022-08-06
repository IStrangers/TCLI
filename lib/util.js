const ora = require("ora")
async function wrapLoading(fn,message) {
  const spinner = ora(message)
  spinner.start()
  try {
    const res = await fn()
    spinner.succeed()
    return res
  } catch (error) {
    spinner.fail(`request failed, refetch...`)
    await sleep(1000)
    return wrapLoading(fn,message)
  }
}

async function sleep(n) {
  return new Promise((resolve,reject) => {
    setTimeout(resolve, n);
  })
}

module.exports = {
  wrapLoading,
  sleep,
}