import AccreditationForm from "./accreditation-form";

export default function AccreditationPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Accreditation</h1>
      <AccreditationForm />
    </div>
  );
}
