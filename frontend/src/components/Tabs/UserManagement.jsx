import { TrashIcon } from "@heroicons/react/solid";
import { deleteUserApi, getUsersApi } from "../../services/api";
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsersApi();
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to fetch users");
        console.error("Fetch error:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete confirmation
  const handleDeleteConfirmation = (userId) => {
    setDeleteUserId(userId);
    setOpenDeleteModal(true);
  };

  // Handle actual deletion
  const confirmDelete = async () => {
    try {
      await deleteUserApi(deleteUserId);
      setUsers(users.filter(user => user._id !== deleteUserId));
      setOpenDeleteModal(false);
    } catch (error) {
      setError("Failed to delete user");
      console.error("Delete error:", error);
      setOpenDeleteModal(false);
    }
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeleteUserId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        User Management
      </h3>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

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
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 text-center">{user.name}</td>
              <td className="py-2 px-4 text-center">{user.email}</td>
              <td className="py-2 px-4 text-center">{user.role}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleDeleteConfirmation(user._id)}
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        aria-labelledby="delete-confirmation-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Confirm User Deletion
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this user account? This action cannot be undone.
          </Typography>
          <div className="mt-4 flex justify-end gap-3">
            <Button 
              variant="outlined" 
              onClick={closeDeleteModal}
              color="primary"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={confirmDelete}
            >
              Confirm Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserManagement;