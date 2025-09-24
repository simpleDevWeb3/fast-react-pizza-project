import { useSelector } from 'react-redux';

function Username() {
  const { name } = useSelector((state) => state.user);
  return (
    <div className="font-semibol hidden text-sm md:block">
      {name === '' ? 'Guest' : name}
    </div>
  );
}

export default Username;
