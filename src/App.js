import axios from "axios";
import { useState } from "react";
import "./App.css";
import img from "./images/img.png";

import { RingLoader } from "react-spinners";

function App() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const res = await axios
        .get("https://reqres.in/api/users?page=1 ")
        .then((res) => {
          setData(res.data.data);
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = () => {
    setLoading(true);
    setTimeout(getData, 4000);
  };
  return (
    <div className="App">
      <nav className="flex justify-around py-4 bg-blue-400">
        <div>
          <img className="w-[3rem]" src={img} />
        </div>
        <button
          className="py-2 px-4 rounded-[2rem] bg-[#e2f1ff] font-bold shadow-[0px_1px_2px_blue] hover:bg-[#c6e5ff]"
          onClick={(e) => getUser(e)}
        >
          get User
        </button>
      </nav>

      {loading ? (
        <div className="flex justify-center m-40">
          <RingLoader />
        </div>
      ) : (
        data.map((user) => (
          <div className="flex justify-center">
            <div
              key={user.id}
              className="flex flex-col justify center shadow-[0px_5px_10px_#aba4a4] p-4 m-12 hover:scale-110 duration-700 rounded-[1rem] w-[20rem] max-w-[20rem]"
            >
              <div className="flex justify-center">
                <img className="rounded-[5rem] my-4" src={user.avatar} />
              </div>
              <h1 className="text-[1.5rem] font-bold">
                {user.first_name} {user.last_name}
              </h1>
              <h1 className="text-blue-900 font-semibold my-4 underline hover:text-blue-800">
                {user.email}
              </h1>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
