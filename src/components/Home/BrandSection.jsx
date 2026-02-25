import b1 from "../../assets/images/brands/b1.png";
import b2 from "../../assets/images/brands/b2.png";
import b3 from "../../assets/images/brands/b3.png";
import b4 from "../../assets/images/brands/b4.png";
import b5 from "../../assets/images/brands/b5.png";

const BrandSection = () => {
  const brands = [
    { name: "Brand 1", logo: b1 },
    { name: "Brand 2", logo: b2 },
    { name: "Brand 3", logo: b3 },
    { name: "Brand 4", logo: b4 },
    { name: "Brand 5", logo: b5 },
  ];

  return (
    <section className="px-4 md:px-8 py-16 bg-rose-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">
          Trusted by <span className="text-red-500">70+ Companies</span>
        </h2>
        <p className="text-gray-500 mb-12">
          We proudly collaborate with leading brands worldwide.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="grayscale-0 hover:grayscale transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;