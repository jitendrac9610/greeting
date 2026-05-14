import TemplateCard from "./TemplateCard";

const TemplateGrid = ({ templates = [], profile, onTemplateClick }) => {
  // ================= EMPTY STATE =================
  if (!templates.length) {
    return (
      <div className="mt-10 text-center text-xl font-semibold text-gray-500">
        No templates found
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {templates.map((template) => (
        <TemplateCard
          key={template._id}
          template={template}
          profile={profile}
          onClick={onTemplateClick}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
