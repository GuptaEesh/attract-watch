import { getData, useData } from "../../helpers";
import { BsChevronDoubleDown } from "react-icons/bs";
import "./home.css";
import { Link } from "react-router-dom";
import { Button, CategoryCard, Loader } from "../../components";
import { useEffect } from "react";
export function Home() {
  const { categories, setCategories, setLoader, loader } = useData();
  useEffect(
    () =>
      (async () => {
        setLoader(true);
        const apiData = await getData();
        setLoader(false);
        setCategories(apiData[1].data.categories);
      })(),
    []
  );
  return loader ? (
    <div className="flex loader-wrapper flex-column  align-center">
      <Loader />
      <h1 className="text-white">Taking you to the world of cars.</h1>
    </div>
  ) : (
    categories.length > 0 && (
      <div>
        <div className="home-page flex flex-column align-center justify-center gap-4">
          <div className="flex align-center flex-column gap-1">
            <h1 className="size-24 text-white">Welcome to the world of cars</h1>
            <h2 className="text-white">
              Take your snacks and sit back and chillax!
            </h2>
            <Link to="/loginMe">
              <Button
                btnText="Sign-In"
                btnClass="primary-video-button home-sign-in btn text-white bold size-16"
              />
            </Link>
          </div>
          <section className="flex flex-column align-center">
            <h2 className="text-white">Explore Categories</h2>
            <BsChevronDoubleDown className="eye-catcher" />
          </section>
        </div>
        <div className="flex flex-column gap-3">
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
    )
  );
}
