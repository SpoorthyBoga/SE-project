// const { clerkClient } = require('@clerk/clerk-sdk-node');

// // Middleware to check if user is authenticated
// const withAuth = async (req, res, next) => {
//   try {
//     // Get the session token from the cookies
//     const token = req.cookies?.__session;
    
//     if (!token) {
//       // No token, continue without authentication
//       return next();
//     }
    
//     try {
//       // Verify the token with Clerk
//       const session = await clerkClient.sessions.verifySession(token);
      
//       // Add the user ID to the request
//       req.auth = {
//         userId: session.userId
//       };
//     } catch (error) {
//       // Invalid token, continue without authentication
//       console.error('Authentication error:', error);
//     }
    
//     next();
//   } catch (error) {
//     console.error('Error in withAuth middleware:', error);
//     next();
//   }
// };

// // Middleware to require authentication
// const requireAuth = (req, res, next) => {
//   if (!req.auth?.userId) {
//     return res.redirect('/login');
//   }
//   next();
// };

// module.exports = { withAuth, requireAuth };
