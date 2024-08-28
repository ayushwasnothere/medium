export const Blogss = () => {
  return (
    <div
      className="w-fit text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
      id="user-dropdown"
    >
      <div className=" px-4 py-3">
        <span className="block text-sm text-gray-900 ">Bonnie Green</span>
        <span className="block text-sm  text-gray-500 truncate ">
          name@flowbite.com
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
          >
            Earnings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};
