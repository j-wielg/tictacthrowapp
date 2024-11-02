import Parse from 'parse';

/**
 * Component which renders the settings page.
 * Requires that the user be logged in for this page to render.
 */
export default function Settings() {
  var user = Parse.User.current();

  return (
    <div>
      <h1>Hi, {user.getUsername()}</h1>
    </div>
  )
}
