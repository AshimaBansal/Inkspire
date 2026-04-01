
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_CLIENT_ID';

async function fetchProducts(page = 1, query = 'art') {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=12`);

        if (!response.ok) {
            throw new Error(`API fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Fetch error, using mock data:', error);

     
        return Array.from({ length: 12 }).map((_, i) => ({
            id: `mock-${i}-${Date.now()}`,
            alt_description: `${query} Original Pattern ${i + 1}`,
            urls: { regular: i % 2 === 0 ? 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800' : 'https://images.unsplash.com/photo-1558362615-567840ec82f3?w=800' },
            likes: Math.floor(Math.random() * 500) + 10,
            topic_submissions: query === 'poster' ? { arts_culture: {} } : null,
            user: { name: 'Studio Inkspire' }
        }));
    }
}
