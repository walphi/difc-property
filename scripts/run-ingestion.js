// Ingestion runner script
const { ingestListings } = require('./dist/lib/ingestion/listings.ingestion');
const { ingestNews } = require('./dist/lib/ingestion/news.ingestion');

async function main() {
  console.log('🤖 Hermes Agent - DIFC.Property');
  console.log('================================\n');

  console.log('📥 Ingesting all data sources...\n');
  
  console.log('1️⃣  Listings...');
  try {
    const listingsResult = await ingestListings();
    console.log('   ✅ Listings ingested');
    console.log(`      ${listingsResult.log.itemsNew} listings, ${listingsResult.buildings.length} buildings`);
  } catch (error) {
    console.error('   ❌ Failed:', error.message);
  }
  
  console.log('\n2️⃣  News...');
  try {
    const newsResult = await ingestNews();
    console.log('   ✅ News ingested');
    console.log(`      ${newsResult.log.itemsNew} articles`);
  } catch (error) {
    console.error('   ❌ Failed:', error.message);
  }
  
  console.log('\n✨ All ingestion complete!');
}

main().catch(console.error);
