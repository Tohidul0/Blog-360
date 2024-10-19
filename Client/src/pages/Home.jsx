import React, { useEffect, useState } from "react";
import CallCompo from "./../components/CallCompo";
import PostCard from "../components/PostCard";

function Home(props) {
  const [morepost, setMorepost] = useState(null);
  const apiUrl =
    import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const laodposts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/post/allposts?limit=3`);
        const data = await res.json();
        setMorepost(data.posts);
        console.log(data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    laodposts();
  }, []);

  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-3xl text-center font-bold font-serif">
        WELCOME TO MY BLOG
      </h1>

      <div className="white-space: nowrap text-5xl text-center mx-auto font-semibold mt-10 mb-5">
        <span className="text-red-600  cursor-pointer">Blog</span>
        360
      </div>
      <p className="w-3/5 mx-auto mb-20 opacity-70">
        Explore Blog360, your gateway to enriching programming knowledge. Dive
        into a diverse array of tech blogs covering JavaScript, React, Node.js,
        Express.js, and more – stay updated and elevate your programming skills!
      </p>
      <CallCompo></CallCompo>
      <div className="mt-20">
        <h1 className="text-3xl text-center">Recent Post</h1>
        <div className=" sm:w-full md:w-4/5 sm:mx-auto flex flex-wrap gap-5 justify-center ">
          {morepost &&
            morepost.map((onepost) => (
              <PostCard onepost={onepost} key={onepost._id}></PostCard>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
