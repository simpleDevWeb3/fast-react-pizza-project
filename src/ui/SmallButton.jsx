function SmallButton({ children, action }) {
  const style =
    'roud-full inline-block rounded-full bg-yellow-400 px-[19px] py-[12px] font-semibold uppercase  transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 ';
  return (
    <button className={style} onClick={action}>
      {children}
    </button>
  );
}

export default SmallButton;
