import cac from 'cac'
import init, { list } from '.'
import { name, version } from '../package.json'

/* istanbul ignore next */
const onError = (err: Error): void => {
  // https://github.com/cacjs/cac#error-handling
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)

const cli = cac(name)

cli
  .command('<template> [project]', 'Create new project from a template')
  .option('-f, --force', 'Overwrite if the target exists')
  .option('-o, --offline', 'Try to use an offline template')
  // .allowUnknownOptions() // for prompts override.
  .example(name => `  $ ${name} <template> [project] # with an official template`)
  .example(name => `  $ ${name} <owner>/<repo> [project] # with a github repo`)
  .action(init)

cli
  .command('list [owner]', 'Show all available templates')
  .alias('ls')
  .option('-c, --cache', 'Show all cached templates')
  .option('-j, --json', 'Output with json format')
  .option('-s, --short', 'Output with short format')
  .action(list)

cli.help().version(version).parse()
