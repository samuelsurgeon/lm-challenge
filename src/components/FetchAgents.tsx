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
  const [filteredAgents, setFilteredAgents] = useState<Agent[] | null>(null);
  const [agents, setAgents] = useState<Agent[] | null>(null);
  const [status, setStatus] = useState<String | null>(null);

  const groupByProperty = (data: Agent[], status: string) => {
    return data.reduce((memo: any, x: any) => {
      if (!memo[x[status]]) {
        memo[x[status]] = [];
      }
      memo[x[status]].push(x);
      return memo;
    }, {});
  };

  const sortData = (data: Agent[]): Agent[] => {
    return data.sort((a: Agent, b: Agent) =>
      a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const { online, offline } = groupByProperty(data.agents, "status");
      const sortedOnline = sortData(online);
      const sortedOffline = sortData(offline);
      setAgents([...sortedOnline, ...sortedOffline]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredAgents(
      agents?.flatMap((agent) => {
        if (agent.status === status) {
          return agent;
        }
        return [];
      }) as Agent[] | null
    );
  }, [agents, status]);

  return (
    <>
      <div className="p-4 flex flex-wrap w-2/3 border rounded-lg bg-slate-100">
        {!status
          ? agents?.map((agent, k) => {
              return <AgentTile {...agent} key={k} />;
            })
          : filteredAgents?.map((agent, k) => {
              return <AgentTile {...agent} key={k} />;
            })}
      </div>
      <div className="mt-4 flex justify-end w-2/3">
        <button
          className="mr-2 bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded"
          onClick={() => setStatus("online")}
        >
          Online
        </button>
        <button
          className="bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded"
          onClick={() => setStatus("offline")}
        >
          Offline
        </button>
      </div>
    </>
  );
};

export default FetchAgents;
