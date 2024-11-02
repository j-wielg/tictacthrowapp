

/**
 * Stateless component that renders text boxes for user input.
 * Can be used to either register new users, or log in existing users.
 *
 * @param user - An object containing (at minimum) 'username' and 'password' fields
 * @param onChange - Determines what happens when a text box is updated
 * @param onSubmit - Determines what happens when the user hits submit
 */
export default function AuthForm({ user, onChange, onSubmit }) {

  // Converts things to title case
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  const getFormType = (str) => {
    if (str === 'password') {
      return 'password';
    } else if (str === 'email') {
      return 'email';
    } else {
      return 'text'
    }
  }

  return (
    <div class="AuthForm">
      <form onSubmit={onSubmit}>
        {Object.entries(user).map(([ field, value ]) => {
          return (
            <div>
              <label>{toTitleCase(field)}</label>
              <br />
              <input
                type={getFormType(field)}
                value={value}
                name={field}
                placeholder={field}
                required
              />
            </div>
          );
        })}
      </form>
    </div>
  )
}
