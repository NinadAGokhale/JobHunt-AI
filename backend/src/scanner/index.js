import { scanLinkedIn } from './linkedin.js'
import { scanNaukri } from './naukri.js'

const SCANNERS = {
  linkedin: scanLinkedIn,
  naukri: scanNaukri,
}

export async function runScan({ roles, locations, sources }) {
  const results = []
  for (const [key, enabled] of Object.entries(sources)) {
    if (enabled && SCANNERS[key]) {
      console.log(`Scanning ${key}...`)
      const jobs = await SCANNERS[key]({ roles, locations })
      results.push(...jobs.map(j => ({ ...j, source: key })))
    }
  }
  return results
}
