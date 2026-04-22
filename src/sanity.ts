import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? '';
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';

// Fallback when no projectId is configured (e.g., local dev without env vars).
// Returning an empty array keeps the UI functional — skeletons then "empty state".
const createMockClient = (): SanityClient =>
  ({ fetch: () => Promise.resolve([]) }) as unknown as SanityClient;

let client: SanityClient;
let builder: ReturnType<typeof imageUrlBuilder> | null;

if (projectId) {
  try {
    client = createClient({
      projectId,
      dataset,
      useCdn: import.meta.env.PROD,
      apiVersion: '2023-03-25',
    });
    builder = imageUrlBuilder(client);
  } catch {
    client = createMockClient();
    builder = null;
  }
} else {
  client = createMockClient();
  builder = null;
}

export const urlFor = (source: SanityImageSource) => {
  if (!source || !builder) return { url: () => '' };
  try {
    return builder.image(source);
  } catch {
    return { url: () => '' };
  }
};

// RUN THIS once to permit localhost for CORS:
//   sanity cors add http://localhost:3000

export default client;
