import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { toast } from "react-hot-toast";
import FeedCard from "./FeedCard";
import { addUser, removeUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { emptyFeed } from "../redux/feedSlice";
import { emptyConnection } from "../redux/connectionSlice";
import { emptyRequest } from "../redux/requestSlice";
import { useNavigate } from "react-router-dom";
import { BadgeCheck } from "lucide-react";

const EditProfile = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/profile`, {
        withCredentials: true,
      });
      const profileData = res?.data?.data;
      setPhotoUrl(profileData.photoUrl || "");
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
      setAge(profileData.age || "");
      setGender(profileData.gender || "");
      setAbout(profileData.about || "");
      setSkills(profileData.skills || []);
      setIsLoading(false);
    } catch (err) {
      // toast.error("Failed to load profile. Please try again.");
      setIsLoading(false);
    }
  };

  const handlePhotoUrlChange = (e) => setPhotoUrl(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleAboutChange = (e) => setAbout(e.target.value);
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
    setSkills(skillsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      photoUrl,
      firstName,
      lastName,
      age,
      gender,
      about,
      skills,
    };

    toast.promise(
      axios
        .patch(`${BACKEND_URL}/profile/edit`, updatedProfile, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(addUser(res.data.data));
          return res;
        })
        .catch((error) => {
          console.error("Profile update error:", error);
          throw error;
        }),
      {
        loading: "Saving...",
        success: <b>Profile saved!</b>,
        error: (err) => <b>{err.response?.data || "Could not save."}</b>,
      }
    );
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/profile/delete`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(removeUser());
      dispatch(emptyFeed());
      dispatch(emptyConnection());
      dispatch(emptyRequest());
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data || "Failed to delete profile. Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#1a1a1a]">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-6 text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1">
            <div className="card bg-[#242424] shadow-xl">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Photo Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="avatar relative">
                      <div className="w-24 rounded-full ring ring-pink-500 ring-offset-base-100 ring-offset-2">
                        <img
                          src={photoUrl || "/placeholder.svg"}
                          alt="profile"
                        />
                      </div>
                      {user?.verified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                          <BadgeCheck size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="w-full max-w-md">
                      <label className="label">
                        <span className="label-text text-white">Photo URL</span>
                      </label>
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={handlePhotoUrlChange}
                        className="input input-bordered w-full bg-[#333333] text-white"
                        placeholder="Enter photo URL"
                      />
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text text-white">
                          First Name
                        </span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="input input-bordered w-full bg-[#333333] text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text text-white">Last Name</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className="input input-bordered w-full bg-[#333333] text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text text-white">Age</span>
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={handleAgeChange}
                        className="input input-bordered w-full bg-[#333333] text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text text-white">Gender</span>
                      </label>
                      <select
                        value={gender}
                        onChange={handleGenderChange}
                        className="select select-bordered w-full bg-[#333333] text-white"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* About */}
                  <div>
                    <label className="label">
                      <span className="label-text text-white">About</span>
                    </label>
                    <textarea
                      value={about}
                      onChange={handleAboutChange}
                      className="textarea textarea-bordered w-full min-h-[100px] bg-[#333333] text-white"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="label">
                      <span className="label-text text-white">Skills</span>
                    </label>
                    <input
                      type="text"
                      value={skills.join(", ")}
                      onChange={handleSkillsChange}
                      className="input input-bordered w-full bg-[#333333] text-white"
                      placeholder="e.g. JavaScript, React, Node.js"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-400">
                        Separate skills with commas
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary w-full bg-pink-500 hover:bg-pink-600"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:min-w-[380px]">
            <div className="sticky top-6">
              <h3 className="text-lg font-medium mb-3 text-white">
                Profile Preview
              </h3>
              <FeedCard
                user={{
                  photoUrl,
                  firstName,
                  lastName,
                  age,
                  gender,
                  about,
                  skills,
                }}
              />
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <div className="mt-8">
          <button
            className="btn btn-error bg-red-500 hover:bg-red-600 text-white"
            onClick={() =>
              document.getElementById("delete-account-modal").showModal()
            }
          >
            Delete Account
          </button>
        </div>

        {/* Delete Account Modal */}
        <dialog
          id="delete-account-modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <form method="dialog" className="modal-box bg-[#242424] text-white">
            <h3 className="font-bold text-lg">Delete Account</h3>
            <p className="py-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="modal-action">
              <button className="btn bg-[#333333] text-white hover:bg-[#444444]">
                Cancel
              </button>
              <button
                className="btn btn-error bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDeleteAccount}
              >
                Yes, Delete My Account
              </button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default EditProfile;
