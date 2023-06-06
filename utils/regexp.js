const domainStripperRegex = /\/\/(www.)*([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/ // gets only the domain part of a website including subdomains
const REGEXP_MATCHED_PATTERN_INDEX = 2

export const stripDomain = (url) => {
  const domain = domainStripperRegex.exec(url)
  if(domain) {
    return domain[REGEXP_MATCHED_PATTERN_INDEX]
  }
  
  return null
}