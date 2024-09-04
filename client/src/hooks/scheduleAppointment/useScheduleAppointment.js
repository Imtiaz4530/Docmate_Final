import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useScheduleAppointment = (doctorId) => {
  const [loading, setLoading] = useState(false);

  const scheduleAppointment = async (data, history) => {
    try {
      setLoading(true);
      await axiosInstance.post("/api/appointments", {
        ...data,
        doctor: doctorId,
      });
      history("/appointments", { replace: true });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    scheduleAppointment,
  };
};

export default useScheduleAppointment;
