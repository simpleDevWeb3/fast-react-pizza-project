import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from './userSlice';
import { useNavigate } from 'react-router-dom';
function CreateUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUsername({ name: username }));
    navigate('/menu');
  }

  if (user.name)
    return <Button to="/menu">Continue Ordering, {user.name}</Button>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input mb-8 w-64 md:w-96"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
