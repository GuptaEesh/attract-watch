import { useNavigate } from "react-router-dom";
import { Button } from "../components";

export function EmptyPage({ emptyPageMessage }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-column justify-space-around text-white align-center"
      style={{ height: "50vh" }}
    >
      <span>Ab hum itne bhi bure nhi, {emptyPageMessage}.</span>
      <Button
        btnClass="primary-video-button btn bold text-white"
        btnText="Explore More"
        btnFunc={() => navigate("/home")}
      />
    </div>
  );
}
