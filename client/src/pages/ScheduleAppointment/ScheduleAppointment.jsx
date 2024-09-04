import { Container, Button, Typography, Paper, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import CustomTextField from "../../components/Common/CustomTextField";
import useScheduleAppointment from "../../hooks/scheduleAppointment/useScheduleAppointment";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useEffect } from "react";

const ScheduleAppointment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const history = useNavigate();
  const location = useLocation();

  const { doctorId, doctorName } = location.state || {};

  const { loading, scheduleAppointment } = useScheduleAppointment(doctorId);

  useEffect(() => {
    if (!doctorId || !doctorName) {
      history("/doctors");
    }
  }, [doctorId, doctorName, history]);

  const onSubmit = (data) => {
    scheduleAppointment(data, history);
    reset();
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Schedule an Appointment with {doctorName}
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <LoadingSpinner />
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label="Select Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  error={!!errors.date}
                  helperText={errors.date ? errors.date.message : ""}
                />
              )}
            />
            <Controller
              name="time"
              control={control}
              defaultValue=""
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label="Select Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  error={!!errors.time}
                  helperText={errors.time ? errors.time.message : ""}
                />
              )}
            />
            <Controller
              name="reason"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label="Reason for Appointment"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={!!errors.reason}
                  helperText={errors.reason ? errors.reason.message : ""}
                />
              )}
            />
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{
                  paddingX: 4,
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
              >
                Schedule Appointment
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ScheduleAppointment;
