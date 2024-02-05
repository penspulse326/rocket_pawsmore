import CreatePhase from "./CreatePhase";

const CreatePageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="outer px-8">
      <div className="inner pt-16">
        <CreatePhase />
      </div>
    </section>
  );
};

export default CreatePageLayout;
