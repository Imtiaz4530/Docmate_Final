import { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";

import axiosInstance from "../../api/axiosInstance";
import useFormatDOB from "../date/useFormatDOB";

const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const authUser = useStoreState((state) => state.user.user);

  const dateOfBirth = profile.dateOfBirth || authUser.dateOfBirth;
  const dob = useFormatDOB(dateOfBirth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/profile?id=${authUser._id}`
        );
        setProfile(response.data);
      } catch (e) {
        console.error("Error fetching profile:", e.message);
      }
    };
    fetchProfile();
  }, [authUser._id]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.put(
        `/api/profile/update/${authUser._id}`,
        data
      );
      setProfile(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    profile,
    editMode,
    setEditMode,
    authUser,
    dob,
    onSubmit,
  };
};

export default useProfile;
