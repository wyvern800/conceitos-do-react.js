import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repositorio ${Date.now()}`,
      owner: "Matheusin",
      techs: ["Bike", "Pneu", "Guidão"],
    });

    const repository = response.data; // dados provenientes da response
    setRepositories([...repositories, repository]);
    console.log(response.data);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete("repositories/" + id, {});

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
