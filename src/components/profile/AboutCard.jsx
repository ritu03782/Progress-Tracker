import { FaEdit } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";

function AboutCard({ profile, onEdit }) {
  return (
    <Card hover={false} title="About Me">
      <p className="text-sm text-slate-300 leading-6">{profile.about}</p>
      <Button variant="secondary" size="sm" className="mt-4 flex items-center gap-2" onClick={onEdit}>
        <FaEdit className="text-xs" /> Edit
      </Button>
    </Card>
  );
}
export default AboutCard;