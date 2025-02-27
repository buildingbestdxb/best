import AccreditationForm from "./accreditation-form";
import AccreditaionList from "./accreditation-list";

export default function AccreditationPage() {
  return (
    <div className="flex flex-col gap-4">
      <AccreditaionList/>
      {/* <AccreditationForm /> */}
    </div>
  );
}
