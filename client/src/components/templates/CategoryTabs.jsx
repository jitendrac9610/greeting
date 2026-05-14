const categories = ["all", "birthday", "festival", "love", "motivation"];

const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
            selectedCategory === category
              ? "bg-pink-500 text-white"
              : "bg-white text-gray-700 shadow-sm"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
