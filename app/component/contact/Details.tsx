import Form from "./Form";
import ContactDetails from "./ContactDetails";
const Details = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center mt-5 lg:mt-[60px]">
            <div className="xl:col-span-6">
              <ContactDetails />
            </div>
            <div className="xl:col-span-6">
              <Form />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Details;
