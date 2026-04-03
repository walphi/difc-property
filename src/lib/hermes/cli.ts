/**
 * Hermes CLI - Run ingestion and optimization tasks
 * 
 * Usage:
 *   npx ts-node src/lib/hermes/cli.ts ingest:listings
 *   npx ts-node src/lib/hermes/cli.ts ingest:news
 *   npx ts-node src/lib/hermes/cli.ts ingest:all
 */

import { ingestListings } from '../ingestion/listings.ingestion'
import { ingestNews } from '../ingestion/news.ingestion'

const command = process.argv[2]

async function main() {
  console.log('🤖 Hermes Agent - DIFC.Property')
  console.log('================================\n')

  switch (command) {
    case 'ingest:listings':
      console.log('📥 Ingesting listings...')
      try {
        const result = await ingestListings()
        console.log('✅ Success!')
        console.log(`   Read: ${result.log.itemsRead} items`)
        console.log(`   New: ${result.log.itemsNew} listings`)
        console.log(`   Buildings: ${result.buildings.length} extracted`)
        console.log(`   Duration: ${result.log.duration}ms`)
      } catch (error) {
        console.error('❌ Failed:', error)
        process.exit(1)
      }
      break

    case 'ingest:news':
      console.log('📰 Ingesting news...')
      try {
        const result = await ingestNews()
        console.log('✅ Success!')
        console.log(`   Read: ${result.log.itemsRead} items`)
        console.log(`   New: ${result.log.itemsNew} articles`)
        console.log(`   Duration: ${result.log.duration}ms`)
      } catch (error) {
        console.error('❌ Failed:', error)
        process.exit(1)
      }
      break

    case 'ingest:all':
      console.log('📥 Ingesting all data sources...\n')
      
      console.log('1️⃣  Listings...')
      try {
        const listingsResult = await ingestListings()
        console.log('   ✅ Listings ingested')
        console.log(`      ${listingsResult.log.itemsNew} listings, ${listingsResult.buildings.length} buildings`)
      } catch (error) {
        console.error('   ❌ Failed:', error)
      }
      
      console.log('\n2️⃣  News...')
      try {
        const newsResult = await ingestNews()
        console.log('   ✅ News ingested')
        console.log(`      ${newsResult.log.itemsNew} articles`)
      } catch (error) {
        console.error('   ❌ Failed:', error)
      }
      
      console.log('\n✨ All ingestion complete!')
      break

    default:
      console.log('Available commands:')
      console.log('  ingest:listings  - Ingest listings from data/listings_difc_seed.json')
      console.log('  ingest:news      - Ingest news from data/news_difc_seed.json')
      console.log('  ingest:all       - Run all ingestion tasks')
      console.log('\nUsage: npx ts-node src/lib/hermes/cli.ts <command>')
  }
}

main()
