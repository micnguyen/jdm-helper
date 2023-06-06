import { readCsv } from "../utils/csvReader.js";
import { renderTable } from "../utils/renderer.js";
import { downloader } from "../utils/downloader.js";
import chalk from "chalk";
import appPackage from "../package.json" assert { type: "json" }; // experimental node flag to import json: https://nodejs.org/docs/latest-v16.x/api/esm.html#json-modules

export const parse = async (file) => {
  console.log(file)

  console.log("Starting jdm-helper v" + appPackage.version)
  console.log("Downloading justdeleteme.xyz sites info...")

  const jdmSites = await downloader('https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json')
  if (jdmSites) {
    console.log("File download success")
  }

  console.log("Reading password file: " + file)
  readCsv(file, (sitesWithAccounts) => {
    console.log('CSV file successfully processed');

     // extract a flat list of all domains 
    const extractedJdmSites = jdmSites.map(jdmSite => {
      return {
        name: jdmSite.name,
        domains: jdmSite.domains,
        url: jdmSite.url,
        difficulty: jdmSite.difficulty
      }
    })
    const jdmDomains = extractedJdmSites.map(element => {
      return element.domains
    }).flat(1) // array depth level 1

    // find matched domains between jdm & password
    const matchedSites = jdmDomains.filter(jdmSite => sitesWithAccounts.includes(jdmSite))

    // get all jdm info for sites that users have accounts to
    const result = extractedJdmSites.filter((parsedEntry) => {
      const domains = parsedEntry.domains
      const userHasAccount = domains.filter(jdm => matchedSites.includes(jdm)).length > 0
      return userHasAccount
    })

    console.log("Rendering output...")
    renderTable({
      appVersion: appPackage.version,
      passwordManager: "1Password", // TODO: Detect password manager off filename
      filename: file,
      inputData: result
    })
    console.log(chalk.bold.bgRed('** Remember to delete your exported password file! **'))
  })
}