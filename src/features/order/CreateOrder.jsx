import {
  Form,
  redirect,
  useActionData,
  useFetcher,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import { getAddress } from '../../services/apiGeocoding';
import LinkButton from '../../ui/LinkButton';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  // const [withPriority, setWithPriority] = useState(false);
  const { name } = useSelector((state) => state.user);
  const [initialName, setInitialName] = useState(name);
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const isSubmitting = navigation.state === 'submitting';
  const actionErrors = useActionData();
  const [formErrors, setFormErrors] = useState(actionErrors);

  const [address, setAddress] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState();

  function handlerLocate() {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const data = await getAddress({ latitude, longitude });
        console.log(data);
        const { postcode, road, suburb, city } = data.address;
        const addressStr = [road, suburb, city, postcode].join(', ');
        setAddress(addressStr);
      } catch (err) {
        console.error(err);
        setAddress('');
      } finally {
        setLoadingLocation(false);
      }
    });
  }

  useEffect(() => {
    if (actionErrors) setFormErrors(actionErrors);
  }, [actionErrors]);

  useEffect(() => {
    if (!actionErrors) return;
    const timer = setTimeout(() => {
      setFormErrors(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [actionErrors]);

  return (
    <div className="mx-20 my-5">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      {cart.length === 0 ? (
        <p>Your cart is still empty. Start adding some pizzas :)</p>
      ) : (
        <>
          {' '}
          <h2 className="font-semibold">Ready to order? Let's go!</h2>
          <Form method="POST">
            <div className="grid grid-cols-[150px_1fr] items-center">
              <label>First Name</label>
              <input
                className="input my-4"
                type="text"
                name="customer"
                value={initialName}
                required
                onChange={(e) => setInitialName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <label>Phone number</label>
              <div className="w-full">
                <input
                  className="input my-4"
                  type="tel"
                  name="phone"
                  required
                />
              </div>
              {formErrors?.phone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                  <p className="fixed flex h-20 items-center bg-stone-50 p-10 blur-0">
                    {formErrors.phone}
                  </p>
                </div>
              )}
            </div>

            <div className="relative grid grid-cols-[150px_1fr] items-center gap-2">
              <label>Address</label>
              <div className="w-full">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                  className="input my-4"
                  required
                />
              </div>
              <div className="absolute right-0 text-[12px]">
                {address ? (
                  ' '
                ) : (
                  <Button action={handlerLocate} disabled={loadingLocation}>
                    {loadingLocation ? 'finding...' : 'Locate'}
                  </Button>
                )}
              </div>
            </div>

            <div className="my-4 flex items-center gap-2">
              <input
                type="checkbox"
                name="priority"
                id="priority"
                className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                // value={withPriority}
                // onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority">
                Want to yo give your order priority?
              </label>
            </div>

            <div>
              <input
                type="hidden"
                name="cart"
                value={JSON.stringify(cart)}
              ></input>
              <Button disabled={isSubmitting}>
                {isSubmitting
                  ? `Placing order..`
                  : `Order now ${formatCurrency(totalPrice)}`}
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart).map((item) => ({
      pizzaId: item.id,
      name: item.name,
      quantity: item.quantity ?? 1,
      unitPrice: item.unitPrice,
      totalPrice: item.total,
    })),
    priority: data.priority === 'on',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'plese give use correct phone number. We might need to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  console.log(order);
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
