function SecondaryButton({ children, action }) {
  const className =
    'border px-6 py-2 uppercase font-semibold rounded-full hover:bg-stone-300/50 transition-colors duration-300 focus:outline-none focus:ring-stone-300';
  return (
    <button className={className} onClick={action}>
      {children}
    </button>
  );
}

export default SecondaryButton;
