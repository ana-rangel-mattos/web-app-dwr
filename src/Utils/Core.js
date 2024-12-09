import dayjs from "dayjs";

function adjustDateTimeForTimezone(dateString) {
  if (!dateString) return new Date();
  const dateUTC = dayjs.utc(dateString);
  const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');
  return dayjs(dateInUTCMinus.format());
}

function handleChange(data, setData, value, field) {
  const d = data;
  d[field] = value;
  setData(() => ({
    ...d,
  }))
}

function calculateDuration(startDate, type) {
  const today = dayjs().startOf('day');
  const startUTC = dayjs.utc(startDate);

  switch(type) {
    case "days":
      return dayjs.duration(today.diff(startUTC)).asDays();
    case "hours":
      return dayjs.duration(today.diff(startUTC)).asHours();
    case "minutes":
      return dayjs.duration(today.diff(startUTC)).asMinutes();
    default:
      return dayjs.duration(today.diff(startUTC)).asMinutes();
  }
}

function getUser() {
  return JSON.parse(localStorage.getItem("session")).user;
}

export { handleChange, adjustDateTimeForTimezone, getUser, calculateDuration }