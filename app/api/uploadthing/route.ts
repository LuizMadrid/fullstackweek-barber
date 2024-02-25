import { createRouteHandler } from 'uploadthing/next';
 
import { ourFileRouter } from './core';
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
	router: ourFileRouter,
	config: {
		// Set this to true to enable CORS
		// cors: true,
	},
});