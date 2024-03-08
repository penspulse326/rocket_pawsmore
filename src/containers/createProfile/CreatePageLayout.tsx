import Footer from "@/components/Footer";
import CreatePhase from "./CreatePhase";

const CreatePageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="outer px-8">
      <div className="inner flex flex-col items-center pt-16">
        <CreatePhase />
        {children}
      </div>
      <Footer />
    </section>
  );
};

export default CreatePageLayout;
