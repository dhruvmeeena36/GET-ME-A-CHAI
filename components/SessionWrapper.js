"use client"
import { SessionProvider } from "next-auth/react"

export default function SessionWrapper({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
//Wraps the entire app with the NextAuth SessionProvider so that authentication state is available throughout your app.

//{children} is a placeholder for whatever you wrap inside <SessionWrapper>
//what is session :-  a session is a way to store user data temporarily while they navigate a website or application. It allows you to keep track of user information, like login status, shopping cart items, or user preferences, across multiple pages or interactions.

//How Does a Session Work?

//User Visits the Website:
//When a user visits a website, the server creates a unique session ID and stores it.
//Session ID Sent to Browser:
//The session ID is sent to the user's browser as a cookie.
//Browser Sends Session ID on Every Request:
//For every subsequent request (like navigating to another page), the browser sends the session ID back to the server.
//Server Identifies the User:
//Using the session ID, the server retrieves the stored data associated with that user, like login status or cart items.


//Why Use a Session Wrapper?
//To centralize session management and authentication logic.
//To protect routes and check user permissions before rendering components.
//To display loading states or redirect users based on authentication status.

//"use client" Directive:
//Declares this component as a Client Component in Next.js.
//Required because it uses hooks or client-side functionality (SessionProvider).