import { TrashIcon } from "@heroicons/react/solid";

const UserManagement = () => {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Management</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-center">Sanat Kakadiya</td>
              <td className="py-2 px-4 text-center">sanatkakadiya@gmail.com</td>
              <td className="py-2 px-4 text-center">admin</td>
              <td className="py-2 px-4 text-center">
                <button className="text-red-400 hover:text-red-600 text-center">
                    <TrashIcon className="w-6 h-6"/>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center">Asdsd</td>
              <td className="py-2 px-4 text-center">sanatkakadiya11@gmail.com</td>
              <td className="py-2 px-4 text-center">admin</td>
              <td className="py-2 px-4 text-center">
                <button className="text-red-400 hover:text-red-600 text-center">
                    <TrashIcon className="w-6 h-6"/>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center">Sanat Kakadiya</td>
              <td className="py-2 px-4 text-center">xyz@gmail.com</td>
              <td className="py-2 px-4 text-center">user</td>
              <td className="py-2 px-4 text-center">
                <button className="text-red-400 hover:text-red-600 text-center">
                    <TrashIcon className="w-6 h-6"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserManagement;
  