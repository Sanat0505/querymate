import { TrashIcon } from "@heroicons/react/solid";
import { deleteUserApi, getUsersApi } from "../../services/api"; // Adjust the path to your api.js file
import { useState, useEffect } from "react";

const UserManagement = () => {
  // State to hold users
  const [users, setUsers] = useState([]);

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsersApi(); // Fetch users from backend
        setUsers(fetchedUsers); // Update state with fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run the effect once when component mounts

  // Handle delete user
  const handleDelete = async (name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      try {
        // Call delete API with the user's name
        const response = await deleteUserApi(name);

        // Log success message and update local state to remove the deleted user
        console.log("Delete Response:", response);

        // Update state to remove the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user.name !== name));
        
        // Show success alert
        alert(`${name} has been deleted successfully.`);
      } catch (error) {
        console.error("Error deleting user:", error.message);
        alert("An error occurred while trying to delete the user. Please try again.");
      }
    }
  };

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
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}> {/* Ensure a unique key for each row */}
                <td className="py-2 px-4 text-center">{user.name}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                <td className="py-2 px-4 text-center">{user.role}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="text-red-400 hover:text-red-600 text-center"
                    onClick={() => handleDelete(user.name)} // Pass user name for delete
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
