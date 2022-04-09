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

  // split agents into two separate arrays based on value of status
  const groupByProperty = (data: Agent[], status: string) => {
    return data.reduce((memo: any, curr: any) => {
      // check if we have encountered value of prop status before
      if (!memo[curr[status]]) {
        // if we haven't create a new array in memo obj
        memo[curr[status]] = [];
      }
      // add current obj value to corresponding memo array
      memo[curr[status]].push(curr);
      return memo;
    }, {});
  };

  // basic sort by first_name
  const sortData = (data: Agent[]): Agent[] => {
    return data.sort((a: Agent, b: Agent) =>
      a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0
    );
  };

  // get data on mount, organise data, and assign to agents state
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const { online, offline } = groupByProperty(data.agents, "status");
      setAgents([...sortData(online), ...sortData(offline)]);
    };

    fetchData();
  }, []);

  // depend on agents and status (controlled by online and offline buttons below) and update filterAgents state
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
