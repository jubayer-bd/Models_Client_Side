import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ModelCard } from "../components/ModelCard";

const MyDownloadsPage = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // ✅ Prevent running before user is loaded

    fetch(`https://3dmodelserver.vercel.app/my-downloads?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json()) // ✅ Return the JSON data
      .then((data) => {
        setModels(data || []); // Handle null or undefined response
        console.log("Fetched models:", data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false)); // ✅ Always stop loading
  }, [user]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 ">
      {models.map((model) => (
        <ModelCard key={model._id} model={model} />
      ))}
    </div>
  );
};

export default MyDownloadsPage;
