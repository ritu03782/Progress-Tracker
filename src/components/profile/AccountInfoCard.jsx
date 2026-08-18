import Card from "../common/Card";
import InfoRow from "./InfoRow";
import { formatMonthYear, formatDateTime } from "../../utils/profileFormat";

function AccountInfoCard({ profile }) {
  return (
    <Card hover={false} title="Account Information">
      <InfoRow label="Email" value={profile.email} />
      <InfoRow label="Member Since" value={formatMonthYear(profile.memberSince)} />
      <InfoRow
        label="Account Status"
        value={
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-400">
            {profile.accountStatus}
          </span>
        }
      />
      <InfoRow label="Last Login" value={formatDateTime(profile.lastLogin)} />
      <InfoRow label="Account Type" value={profile.accountType} />
    </Card>
  );
}
export default AccountInfoCard;