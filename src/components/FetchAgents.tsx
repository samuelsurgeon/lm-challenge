import { useEffect, useState } from "react";
import AgentTile from "./AgentTile";

const url =
  "https://3nzfzc8au7.execute-api.us-east-1.amazonaws.com/default/agents";

export type Agent = {
  avatar: string;
  first_name: string;
  last_name: string;
  profile: string;
  status: string;
};

const FetchAgents = () => {
  const [agents, setAgents] = useState<Agent[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setAgents(data.agents);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex flex-wrap w-2/3 border rounded-lg bg-slate-100">
      {agents?.map((agent) => {
        return <AgentTile {...agent} />;
      })}
    </div>
  );
};

export default FetchAgents;
