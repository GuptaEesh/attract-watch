import { useData } from "../../helpers";
import { BsChevronDoubleDown } from "react-icons/bs";
import "./home.css";
import { Link } from "react-router-dom";
import { Button, CategoryCard } from "../../components";
export function Home() {
  const { categories } = useData();
  return (
    <div>
      <div
        className="home-page flex flex-column align-center justify-center"
        style={{ gap: "4rem" }}
      >
        <div className="flex align-center flex-column" style={{ gap: "1rem" }}>
          <h1 className="size-24 text-white">Welcome to the world of cars</h1>
          <h2 className="text-white">
            Take your snacks and sit back and chillax!
          </h2>
          <Link to="/loginMe">
            <Button
              btnText="Sign-In"
              btnClass="primary-video btn text-white bold size-16"
              btnStyle={{ padding: "10px 1.5rem" }}
            />
          </Link>
        </div>
        <section className="flex flex-column align-center">
          <h2 className="text-white">Explore Categories</h2>
          <BsChevronDoubleDown color="var(--red-400)" size="4rem" />
        </section>
      </div>
      <div className="flex flex-column" style={{ gap: "5rem" }}>
        {categories.map(
          ({ id, categoryName: name, description, image }, index) => (
            <CategoryCard
              index={index}
              key={id}
              imgSrc={image}
              desc={description}
              title={name}
            />
          )
        )}
      </div>
    </div>
  );
}
