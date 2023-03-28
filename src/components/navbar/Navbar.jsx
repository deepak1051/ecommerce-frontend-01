import './navbar.css';
import { BsCart2, BsSearch } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
  // const { role } = useSelector((state) => state.auth);
  const [role, setRole] = useState(null);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   try {
  //     setRole(jwtDecode(token).role || '');
  //   } catch (error) {
  //     setRole(null);
  //     return;
  //     throw new Error('invalid token');
  //     console.err('error');
  //     role = '';
  //   }
  // }, []);

  if (token) {
    try {
      setRole(jwtDecode(token).role || '');
    } catch (error) {
      setRole(null);
      return;
    }
  }

  return (
    <header class="text-gray-600 body-font ">
      <div class="container mx-auto flex  p-5 flex-col md:flex-row items-center justify-between">
        <Link
          to="/"
          class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Furniture Lelo</span>
        </Link>

        {/* {role === 'admin' && (
          <>
            <h2>Admin Panel</h2>
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center gap-5">
              <Link class="mr-5 hover:text-gray-900" to="/admin/product-list">
                Product List
              </Link>
              <Link class="mr-5 hover:text-gray-900" to="/admin/create-product">
                Add Product
              </Link>
              <Link class="mr-5 hover:text-gray-900" to="/admin/seller-list">
                Seller List
              </Link>
            </nav>
          </>
        )}

        {role === 'seller' && (
          <>
            <h2>Seller Panel</h2>
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center gap-5">
              <Link class="mr-5 hover:text-gray-900" to="/seller">
                Seller Home Page
              </Link>
              <Link
                class="mr-5 hover:text-gray-900"
                to="/seller/create-product"
              >
                Add Product
              </Link>
            </nav>
          </>
        )} */}
        <div className="flex items-center">
          {!token && (
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center gap-5">
              <Link
                class="mr-5 hover:text-gray-900"
                className="header-action-btn"
                to="/cart"
              >
                <BsCart2 className="text-2xl" />
                <p className="header-action-label">Cart</p>
                <div className="btn-badge bg-teal-600" aria-hidden="true">
                  {cartTotalQuantity}
                </div>
              </Link>
              <Link
                class="mr-5 hover:text-gray-900"
                className="header-action-btn"
              >
                <AiOutlineHeart className="text-2xl" />

                <p className="header-action-label">Wish</p>

                <div className="btn-badge bg-pink-600" aria-hidden="true">
                  2
                </div>
              </Link>
              <Link class="mr-5 hover:text-gray-900" to="/product-list">
                Products
              </Link>
              {/* <Link class="mr-5 hover:text-gray-900">Fourth Link</Link> */}
            </nav>
          )}
          {!token ? (
            <Link to="/customer-login">
              <button class="inline-flex items-center bg-teal-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          ) : (
            <button
              onClick={() => dispatch(logoutUser())}
              class="inline-flex items-center bg-red-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
