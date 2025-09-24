import { Link } from 'react-router-dom';
function Button({ to, children, disabled, action }) {
  const className =
    'roud-full inline-block rounded-full bg-yellow-400 px-4  py-4 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed sm:px-6';
  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button
      type="submit"
      className={className}
      disabled={disabled}
      onClick={action ? action : undefined}
    >
      {children}
    </button>
  );
}

export default Button;
