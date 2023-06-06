import * as fs from 'fs';
import { parse } from 'csv-parse';
import { stripDomain } from './regexp.js';

const HEADER_URL_INDEX = 1

export const readCsv = (filePath, onFinish) => {
  const sitesWithAccounts = []
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      const site = row[HEADER_URL_INDEX]
      const strippedDomain = stripDomain(site)
      if (strippedDomain) {
        sitesWithAccounts.push(strippedDomain)
      }
    })
    .on('end', () => {
      let uniqueSitesWithAccounts = [...new Set(sitesWithAccounts)];
      onFinish(uniqueSitesWithAccounts)
    });
}
