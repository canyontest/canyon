import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {useQuery} from "@apollo/client";
import {GetProjectsDocument} from "./helpers/backend/gen/graphql.ts";

function App() {
	const [count, setCount] = useState(0);


  const {data} = useQuery(GetProjectsDocument,{
    variables:{
      keyword: "1",
      lang: "null",
      bu: "null",
      tag: "null",
      current: 1,
      pageSize: 2,
      field: "3",
      order: "4",
      favorOnly: false
    }
  })

	return (
		<>
      <div>
        {(data?.getProjects.data||[])?.map((project)=>(
          <div key={project.id}>{project.description}</div>
        ))}
      </div>
		</>
	);
}

export default App;
