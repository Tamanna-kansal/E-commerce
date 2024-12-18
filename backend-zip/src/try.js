

// const findOrCreateUserFromAuth0 = async (auth0User) => {
//     try {
//         // Log the entire auth0User object to see its structure
//         console.log("Auth0 User Profile:", auth0User);

//         const {
//             sub: auth0Id,         // Auth0 ID
//             name: { givenName: firstName = "Auth0", familyName: lastName = "User" } = {}, // Extract names from the 'name' object
//             emails = []           // Emails array
//         } = auth0User;

//         const email = emails[0]?.value; // Safely extract email

//         // Validate email presence
//         if (!email) {
//             throw new Error("Auth0 user data is missing the required email field.");
//         }

//         // Log the extracted fields
//         console.log("Extracted firstName:", firstName);
//         console.log("Extracted lastName:", lastName);
//         console.log("Full Name:", firstName + " " + lastName);

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         // If user doesn't exist, create one
//         if (!user) {
//             user = await User.create({
//                 firstName,
//                 lastName,
//                 email,
//                 password: "N/A", // Auth0 handles authentication
//                 role: "CUSTOMER",
//             });
//             console.log("New user created:", user);

//             // Create a cart for the user after registration
//             await cartService.createCart(user);  // This ensures the cart is created for the Auth0 user
//             console.log("Cart created for Auth0 user:", user._id);
//         }

//         return user;
//     } catch (error) {
//         console.error("Error syncing Auth0 user:", error.message);
//         throw new Error("Failed to sync user with Auth0.");
//     }
// };

// const findOrCreateUserFromAuth0 = async (auth0User) => {
//     try {
//         // Log the entire auth0User object to see its structure
//         console.log("Auth0 User Profile:", auth0User);

//         const {
//             sub: auth0Id,         // Auth0 ID
//             name: { givenName: firstName = "Auth0", familyName: lastName = "User" } = {}, // Extract names from the 'name' object
//             emails = []           // Emails array
//         } = auth0User;

//         const email = emails[0]?.value; // Safely extract email

//         // Validate email presence
//         if (!email) {
//             throw new Error("Auth0 user data is missing the required email field.");
//         }

//         // Log the extracted fields
//         console.log("Extracted firstName:", firstName);
//         console.log("Extracted lastName:", lastName);
//         console.log("Full Name:", firstName + " " + lastName);

//         // Check if user already exists by matching the Auth0 ID
//         let user = await User.findOne({ auth0Id });  // Use auth0Id to find the user

//         // If user doesn't exist, create one
//         if (!user) {
//             user = await User.create({
//                 firstName,
//                 lastName,
//                 email,
//                 password: "N/A", // Auth0 handles authentication
//                 role: "CUSTOMER",
//                 auth0Id,         // Store the Auth0 ID in the database
//             });
//             console.log("New user created:", user);

//             // Create a cart for the user after registration
//             await cartService.createCart(user);  // Ensure cart is created for Auth0 user
//             console.log("Cart created for Auth0 user:", user._id);
//         }

//         return user;
//     } catch (error) {
//         console.error("Error syncing Auth0 user:", error.message);
//         throw new Error("Failed to sync user with Auth0.");
//     }
// };
// const findOrCreateUserFromAuth0 = async (auth0User) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         // Log the entire auth0User object to see its structure
//         console.log("Auth0 User Profile:", auth0User);

//         // Destructure the necessary fields from the Auth0 user object
//         const {
//             id: auth0Id,            // Auth0 ID (using `id` as primary key)
//             name: { givenName: firstName = "Auth0", familyName: lastName = "User" } = {}, // Extract names
//             emails = []             // Emails array
//         } = auth0User;

//         const email = emails[0]?.value;  // Safely extract email from the first element

//         // Validate email presence
//         if (!email) {
//             throw new Error("Auth0 user data is missing the required email field.");
//         }

//         // Log the extracted fields for debugging
//         console.log("Extracted firstName:", firstName);
//         console.log("Extracted lastName:", lastName);
//         console.log("Full Name:", firstName + " " + lastName);
//         console.log("Extracted Email:", email);
//         console.log("Auth0 ID:", auth0Id);

//         // Check if the user already exists using `auth0Id`
//         console.log("Checking if user exists with auth0Id:", auth0Id);
//         let user = await User.findOne({ auth0Id }).session(session);

//         // If user doesn't exist, create one
//         if (!user) {
//             console.log("User not found, creating a new user...");
//             user = await User.create([
//                 {
//                     firstName,
//                     lastName,
//                     email,
//                     password: "N/A",  // Auth0 handles authentication, no password needed
//                     role: "CUSTOMER",
//                     auth0Id,           // Store the Auth0 ID in the database
//                 }
//             ], { session });
//             console.log("New user created:", user);

//             // Create a cart for the new user
//             console.log("Creating cart for user ID:", user[0]._id);
//             await cartService.createCart(user[0]._id, session);  // Pass user ID to createCart
//             console.log("Cart created for new user:", user[0]._id);
//         } else {
//             console.log("User already exists:", user);
//         }

//         // Commit the transaction
//         await session.commitTransaction();
//         session.endSession();
        
//         return user;
//     } catch (error) {
//         // If any error occurs, abort the transaction
//         console.error("Error syncing Auth0 user:", error.message);
//         await session.abortTransaction();
//         session.endSession();
//         throw new Error("Failed to sync user with Auth0.");
//     }
// };
