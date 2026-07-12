import dayjs from "dayjs";

export function getTodayDate() {
  const today = dayjs().format("MMM DD YYYY");
  return today;
}
