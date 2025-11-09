import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.REACT_APP_PUBLIC_SANITY_DATASET || 'production';

// Create a mock client if projectId is not set
// Using unknown cast as suggested by TypeScript to handle the type mismatch
const createMockClient = (): SanityClient => ({
  fetch: () => Promise.resolve([]),
} as unknown as SanityClient);

let client: SanityClient;
let builder: ReturnType<typeof imageUrlBuilder> | null;

if (projectId) {
  try {
    client = createClient({
      projectId: projectId,
      dataset: dataset,
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: '2023-03-25',
    });
    builder = imageUrlBuilder(client);
  } catch (error) {
    // console.warn('Failed to create Sanity client:', error);
    client = createMockClient();
    builder = null;
  }
} else {
  // console.warn('Sanity projectId is not configured. Using mock client.');
  client = createMockClient();
  builder = null;
}

export const urlFor = (source: SanityImageSource) => {
  if (!source || !builder) return { url: () => '' };
  try {
    return builder.image(source);
  } catch (error) {
    // console.error('Error creating image URL:', error);
    return { url: () => '' };
  }
};

// RUN THIS to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;