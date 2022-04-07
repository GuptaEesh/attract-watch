import { useAuth } from "../../../helpers";
import "./snackbar.css";
export function MySnackbar({ snackMessage }) {
  const { setSnackBar } = useAuth();
  return (
    <div className="flex align-center text-white justify-space-between snackbar-wrapper">
      <span className="bold">{snackMessage}</span>
      <span
        className=" text-center close-snackbar"
        onClick={() =>
          setSnackBar({ isSnackBarVisible: false, snackMessage: "" })
        }
      >
        X
      </span>
    </div>
  );
}
