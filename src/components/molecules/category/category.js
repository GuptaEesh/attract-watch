import "./category.css";
export function CategoryCard({ imgSrc, desc, title, index }) {
  return (
    <div className="flex justify-space-around category-card">
      {index % 2 === 0 ? (
        <>
          <img src={imgSrc} alt={title} loading="lazy" />
          <section
            className="flex justify-center flex-column text-white"
            style={{ gap: "1rem" }}
          >
            <h2>{title}</h2>
            <p className="text-left">{desc}</p>{" "}
          </section>
        </>
      ) : (
        <>
          <section
            className="flex justify-center flex-column text-white"
            style={{ gap: "1rem" }}
          >
            <h2>{title}</h2>
            <p className="text-left">{desc}</p>
          </section>
          <img src={imgSrc} alt={title} loading="lazy" />
        </>
      )}
    </div>
  );
}
