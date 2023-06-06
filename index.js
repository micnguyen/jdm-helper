#! /usr/bin/env node
import { list } from "./commands/list.js";
import { add } from "./commands/add.js";
import { markDone } from "./commands/markDone.js";
import { downloader } from "./utils/downloader.js";
import { Command } from 'commander';
import { parse } from 'csv-parse';
import { readCsv } from "./utils/csvReader.js";
import { stripDomain } from "./utils/regexp.js";
import { renderTable } from "./utils/renderer.js";
import appPackage from "./package.json" assert { type: "json" };

const program = new Command();

console.log("Starting jdm-helper v" + appPackage.version)
console.log("Downloading justdeleteme.xyz sites info...")
const jdmSites = await downloader('https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json')
const parsedJdmSites = jdmSites.map(jdmSite => {
  return {
    name: jdmSite.name,
    domains: jdmSite.domains,
    url: jdmSite.url,
    difficulty: jdmSite.difficulty
  }
})

readCsv('./test_data/1PasswordExport-3CJPZFQNXBDCXEZCUYJQ2J2KOM-20230605-101912.csv', (sitesWithAccounts) => {
  console.log('CSV file successfully processed');

  // extract a flat list of all domains 
  const jdmDomains = parsedJdmSites.map(element => {
    return element.domains
  }).flat(1)

  // find matched domains between jdm & password
  const matchedSites = jdmDomains.filter(jdmSite => sitesWithAccounts.includes(jdmSite))

  // get all jdm info for sites that users have accounts to
  const result = parsedJdmSites.filter((parsedEntry) => {
    const domains = parsedEntry.domains
    const userHasAccount = domains.filter(jdm => matchedSites.includes(jdm)).length > 0
    return userHasAccount
  })

  console.log("Rendering output...")
  renderTable({
    appVersion: appPackage.version,
    passwordManager: "1Password",
    filename: "filename.csv",
    inputData: result
  })
})

program
  .command('list')
  .description('Sync')
  .action(list)

program
  .command('add <task>')
  .description('Add a new TODO task')
  .action(add)

program
  .command('mark-done')
  .description('Mark commands done')
  .option('-t, --tasks <tasks...>', 'The tasks to mark done. If not specified, all tasks will be marked done.')
  .action(markDone)

program.parse()