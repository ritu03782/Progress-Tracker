function CompanyAvatar({ application, size = "w-10 h-10" }) {
  return (
    <div className={`${size} rounded-full flex items-center justify-center font-bold shrink-0 ${application.avatarBg} ${application.avatarText}`}>
      {application.avatarLetter}
    </div>
  );
}
export default CompanyAvatar;