const Navbar = () => {
  return (
    <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">

      <h2 className="text-xl font-semibold">
        Admin Companion
      </h2>

      <div className="flex gap-4 items-center">

        <input
          type="text"
          placeholder="Ask Savra AI"
          className="border rounded-full px-4 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>Grade 7</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Subjects</option>
        </select>

      </div>

    </div>
  );
}

export default Navbar;