function Input({ queryRef, searchKey, handleInputChange }) {
  return (
    <input
      ref={queryRef}
      value={searchKey}
      onChange={handleInputChange}
      type="search"
      id="default-search"
      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
      placeholder="Search"
      required
    />
  );
}
export default Input;
