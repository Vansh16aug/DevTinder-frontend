import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { toast } from "react-hot-toast";
import FeedCard from "./FeedCard";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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
      toast.error("Failed to load profile. Please try again.");
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
    setIsLoading(true);

    const updatedProfile = {
      photoUrl,
      firstName,
      lastName,
      age,
      gender,
      about,
      skills,
    };

    try {
      const res = await axios.patch(
        `${BACKEND_URL}/profile/edit`,
        updatedProfile,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      dispatch(addUser(res?.data?.data));
      setIsLoading(false);
    } catch (err) {
      toast.error(
        err.response?.data || "Failed to update profile. Please try again."
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-3">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Preview</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={photoUrl || "/placeholder.svg"}
                      alt="profile"
                      className="rounded-full w-32 h-32 object-cover mb-4"
                    />
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Photo URL</span>
                      </label>
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={handlePhotoUrlChange}
                        className="input input-bordered w-full"
                        placeholder="Enter photo URL"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">First Name</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Last Name</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className="input input-bordered"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Age</span>
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={handleAgeChange}
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <select
                        value={gender}
                        onChange={handleGenderChange}
                        className="select select-bordered"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">About</span>
                    </label>
                    <textarea
                      value={about}
                      onChange={handleAboutChange}
                      className="textarea textarea-bordered"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Skills (comma-separated)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={skills.join(", ")}
                      onChange={handleSkillsChange}
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-start">
            <div className="sticky top-8">
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
      </div>
    </div>
  );
};

export default EditProfile;
