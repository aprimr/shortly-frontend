import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { TbUserEdit } from "react-icons/tb";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { PiWarningFill } from "react-icons/pi";
import { BiMessageSquareError } from "react-icons/bi";
import { LoginUser, LogoutUser } from "../store/slices/auth.slice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user) || {};
  const profilePic = user.profilePic;

  const [newProfilePic, setNewProfilePic] = useState(profilePic);
  const [fullname, setFullname] = useState(user.fullname || "");
  const [email, setEmail] = useState(user.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const joined = user.joined ? user.joined.split("T", 1) : "Not available";

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [deleteError, setDeletError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const dispatch = useDispatch();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setNewProfilePic("");
  };
  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const maxSize = 2 * 1024 * 1024; // 2MB limit

    if (selectedFile.size > maxSize) {
      setError("Image size exceeds 1MB!");
      return;
    }

    if (selectedFile) {
      convertToBase64(selectedFile);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordError("");
    setPasswordMessage("");
    setIsUpdatingPassword(false);
    if (!oldPassword || !newPassword) {
      setPasswordError("Please fill in all fields");
      return;
    }
    if (newPassword.length < 8 || newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    if (oldPassword === newPassword) {
      setPasswordError("Old password and new password can't be same");
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profile/update-password`,
        {
          username: user.username,
          password: oldPassword,
          newPassword: newPassword,
        }
      );
      if (res.status === 200) {
        setOldPassword("");
        setNewPassword("");
        setPasswordMessage(res.data.message);
        setIsUpdatingPassword(false);
      }
    } catch (error) {
      setPasswordError(error.response?.data?.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(false);
    setError("");
    try {
      setIsSaving(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profile/update-profile`,
        {
          username: user.username,
          fullname,
          image: newProfilePic,
        }
      );
      dispatch(LoginUser({ user: res.data.user, token: res.data.token }));
      setIsSaving(false);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleDeleteProfile = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(false);
    if (!deletePassword) {
      setDeletError("Password is required");
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profile/user`,
        { data: { username: user.username, password: deletePassword } }
      );
      if (res.status === 200) {
        setIsDeleting(false);
        setDeletError("");
        setIsModalOpen(false);
        dispatch(LoginUser({ user: null, token: null }));
        dispatch(LogoutUser());
      }
    } catch (error) {
      setIsDeleting(false);
      setDeletError(error.response.data.message);
    }
  };

  const handleCloseModal = () => {
    setDeletePassword("");
    setDeletError("");
    setIsDeleting(false);
    setIsModalOpen(false);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setNewProfilePic(reader.result);
    };

    reader.onerror = (error) => {
      console.log(`Error converting file: ${error}`);
    };
  };

  return (
    <div className="relative min-h-screen min-w-full bg-gray-900 text-white flex justify-center items-center">
      <div className="min-h-screen max-w-full md:max-w-3xl w-full bg-gray-900 border-r border-l border-gray-800  p-6 shadow-xl space-y-6 flex flex-col justify-center">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-3 relative">
          {/* Profile Picture */}
          <div className={`relative ${isEditing ? "blur-sm" : ""}`}>
            <img
              src={newProfilePic ? newProfilePic : user.profilePic}
              alt="profile-pic"
              className="h-32 w-32 rounded-full object-cover border-2 border-gray-900"
            />
          </div>
          {/* Edit Profile Pic Button */}
          {isEditing && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => document.getElementById("upload").click()}
                className="flex items-center justify-center bg-gray-900 text-white rounded-full p-3 shadow-md z-50 opacity-80"
              >
                <TbUserEdit className="text-2xl" />
              </button>
              <input
                type="file"
                id="upload"
                onChange={(e) => handleFileUpload(e)}
                className="hidden"
              />
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {user.fullname}
          </h1>
          <p className="text-sm sm:text-lg text-gray-400">@{user.username}</p>
        </div>

        {/* Error */}
        <div className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <MdErrorOutline className="text-rose-500" />
              {error}
            </p>
          )}

          {/* Full Name Edit */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <label
              htmlFor="fullname"
              className="text-sm sm:text-lg text-gray-400"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={handleFullnameChange}
              disabled={!isEditing}
              className={`w-full mt-2 px-4 py-2 rounded-lg bg-gray-700 text-sm sm:text-lg text-white focus:outline-none ${
                isEditing
                  ? "focus:ring-2 focus:ring-emerald-500"
                  : "opacity-50 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <label htmlFor="email" className="text-sm sm:text-lg text-gray-400">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-700 text-sm sm:text-lg text-white opacity-50 cursor-not-allowed"
            />
            {isEditing && (
              <p className="text-[10px] md:text-sm mt-1 text-rose-500">
                Email cannot be edited.
              </p>
            )}
          </div>

          {/* Change Password */}
          {isEditing && (
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-3">
              <label className="text-sm sm:text-lg text-gray-400">
                Change Password:
              </label>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-sm sm:text-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-sm sm:text-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {/* error */}
              {passwordError && (
                <span className="text-sm rounded-sm text-white bg-rose-500 px-4 py-1">
                  {passwordError}
                </span>
              )}
              {/* message */}
              {passwordMessage && (
                <span className="text-sm rounded-sm text-white bg-emerald-500 px-4 py-1">
                  {passwordMessage}
                </span>
              )}
              <div className="w-full flex justify-end">
                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword}
                  className={`bg-emerald-500 text-gray-900 py-2 px-4 rounded-md flex items-center justify-center overflow-hidden transition-all duration-500 hover:bg-emerald-600 ${
                    isUpdatingPassword
                      ? "w-20 cursor-not-allowed bg-emerald-600"
                      : "w-auto"
                  }`}
                >
                  {!isUpdatingPassword ? (
                    "Update password"
                  ) : (
                    <AiOutlineLoading className="animate-spin text-xl text-gray-900" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Date of Joining */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <label
            htmlFor="joinedDate"
            className="text-sm sm:text-lg text-gray-400"
          >
            Joined Date:
          </label>
          <input
            type="text"
            id="joinedDate"
            value={joined}
            disabled
            className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-700 text-sm sm:text-lg text-white opacity-50 cursor-not-allowed"
          />
          {isEditing && (
            <p className="text-[10px] md:text-sm mt-1 text-rose-500">
              Joined date cannot be edited.
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between items-center">
          {/* Delete */}
          <button
            onClick={handleDeleteProfile}
            className="bg-red-600 flex gap-1 justify-center items-center text-white py-2 px-6 rounded-lg font-medium hover:bg-red-700 transition duration-300 text-sm sm:text-base"
          >
            <AiOutlineDelete className="text-xl" />
            Delete Profie
          </button>
          {/* Save */}
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-emerald-500 text-gray-900 py-2 px-4 rounded-md flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out hover:bg-emerald-600 ${
                isSaving ? "w-20 cursor-not-allowed bg-emerald-600" : "w-auto"
              }`}
            >
              {!isSaving ? (
                "Save"
              ) : (
                <AiOutlineLoading className="animate-spin text-xl text-gray-900" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="absolute top-4 right-8 flex flex-row gap-1 items-center">
        {/* Conditionally show text and arrow when not editing */}
        {!isEditing && (
          <span className="text-sm md:text-lg text-white flex items-center animate-pulse">
            Edit Profile
            <IoIosArrowForward />
          </span>
        )}
        <button
          onClick={toggleEdit}
          className="flex items-center gap-2 bg-gray-800 rounded-md text-xl sm:text-2xl text-white p-1"
        >
          <TbUserEdit />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed h-[100vh] inset-0 flex items-center justify-center z-20 bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md w-auto mx-10">
            <h2 className="text-xl font-medium text-gray-100">
              Are you sure you want to delete your account?
            </h2>
            <span className="text-sm w-56 flex justify-center items-center gap-1 rounded-sm bg-white text-red-500">
              <BiMessageSquareError /> This action is irreversible.
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 rounded-md bg-gray-700 text-sm sm:text-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            {deleteError && (
              <span className="text-xs mt-2 text-red-500 py-0 px-1 flex flex-row gap-1 items-center">
                <PiWarningFill />
                {deleteError}
              </span>
            )}
            <div className="mt-3 flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={`bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center overflow-hidden transition-all duration-300 ${
                  isDeleting ? "w-20" : "w-auto"
                }`}
              >
                {!isDeleting ? (
                  "Confirm Delete"
                ) : (
                  <AiOutlineLoading className="animate-spin" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
