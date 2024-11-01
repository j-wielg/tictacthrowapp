// Contains important authentication functions

import Parse from 'parse';


/**
 * Attempts to register a new user.
 * Can fail if the user already exists, or if username / password
 * are unspecified.
 * 
 * Email is optional
 */
export async function registerUser(username, password, email) {
  // Creates a user object
  var user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  if (email != undefined) {
    user.set("email", email);
  }
  // Makes a request to add the user to the server
  // If this errors, it's up to the application to handle it
  return user.signUp();
}


/**
 * Attempts to log in to an existing account.
 * Requires that the username and password be set.
 */
export async function loginUser(username, password) {
  return Parse.User.logIn(username, password);
}


/**
 * Logs out the current user, if applicable
 */
export async function logoutUser() {
  return Parse.User.logOut();
}
