import { useEffect } from "react";
import { Agent } from "./FetchAgents";

const AgentTile = ({
  avatar,
  first_name,
  last_name,
  profile,
  status,
}: Agent) => {
  useEffect(() => {}, []);

  return (
    <div className="p-4 mr-4 mb-4 w-fit rounded-lg border font-sans bg-white">
      <img className="rounded-lg" src={avatar} alt="" />
      <div className="flex justify-between items-end mt-2">
        <div>
          <h2 className="font-bold text-slate-700">
            {first_name} {last_name}
          </h2>
          <h2 className="font-medium text-slate-400 capitalize">{profile}</h2>
        </div>
        <div className="flex items-center">
          <div
            className={`${
              status === "online" ? "bg-lime-500" : "bg-gray-200"
            } mr-1.5  w-2 h-2 rounded-full`}
          />
          <h2 className="capitalize">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default AgentTile;
