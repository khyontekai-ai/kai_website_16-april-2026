const fs = require('fs');

async function sync() {
  const adminPassword = 'khyontek_admin_2026';
  const baseUrl = 'https://www.khyontekai.com/api';
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminPassword}`
  };

  try {
    console.log('Fetching existing reviews...');
    const res = await fetch(`${baseUrl}/reviews`);
    const existing = await res.json();
    
    console.log(`Found ${existing.length} existing reviews. Deleting them...`);
    for (const rev of existing) {
      await fetch(`${baseUrl}/reviews/${rev.id}`, {
        method: 'DELETE',
        headers
      });
      console.log(`Deleted ${rev.id}`);
    }

    console.log('Reading local reviews.json...');
    const localReviews = JSON.parse(fs.readFileSync('data/reviews.json', 'utf8'));
    
    console.log(`Found ${localReviews.length} local reviews. Uploading to Vercel...`);
    for (const rev of localReviews) {
      const payload = {
        name: rev.name,
        rating: rev.rating,
        text: rev.text
      };
      const postRes = await fetch(`${baseUrl}/reviews`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      if (postRes.ok) {
        console.log(`Successfully uploaded review by ${rev.name}`);
      } else {
        const err = await postRes.text();
        console.error(`Failed to upload review by ${rev.name}: ${err}`);
      }
    }
    
    console.log('Sync complete!');
  } catch (err) {
    console.error('Error during sync:', err);
  }
}

sync();
