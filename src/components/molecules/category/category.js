import "./category.css";
export function CategoryCard({ imgSrc, desc, title, index }) {
  return (
    <div className="flex justify-space-around category-card">
      <div
        className={
          index % 2 === 0
            ? "category-even flex align-center gap-1"
            : "category-odd flex align-center gap-1"
        }
      >
        <img src={imgSrc} alt={title} loading="lazy" />
        <section className="flex justify-center flex-column text-white gap-1">
          <h2>{title}</h2>
          <p className="text-left">{desc}</p>{" "}
        </section>
      </div>
    </div>
  );
}
