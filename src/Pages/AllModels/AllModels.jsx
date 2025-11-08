import { useLoaderData } from "react-router";
import { useState } from "react";
import { ModelCard } from "../../components/ModelCard";

const AllModels = () => {
  const loadedData = useLoaderData();
  const [data, setData] = useState(loadedData); // store the models here

  const handleSearch = (e) => {
    e.preventDefault();
    const search_Text = e.target.name.value.trim();

    if (!search_Text) return;

    fetch(`https://3dmodelserver.vercel.app/search?name=${search_Text}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error("Error fetching search:", err));
  };

  return (
    <div>
      <div className="text-2xl text-center font-bold">All Models</div>
      <p className="text-center mb-10">Explore 3D models.</p>

      {/* search */}
      <form
        onSubmit={handleSearch}
        className="text-center flex justify-center items-center mb-10 gap-2"
      >
        <label className="input rounded-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" name="name" required placeholder="Search" />
        </label>
        <button className="btn btn-primary rounded-full">Search</button>
      </form>

      {/* Models */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {data.length > 0 ? (
          data.map((model) => <ModelCard key={model._id} model={model} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No models found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllModels;
