const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const createRepositoryOperation = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(createRepositoryOperation);

  return response.json(createRepositoryOperation);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryInArray = repositories.find(
    (repository) => repository.id === id
  );

  if (!repositoryInArray) {
    return response.status(404).json({ error: "Repository not found" });
  }
  repositoryInArray.title = title;
  repositoryInArray.url = url;
  repositoryInArray.techs = techs;

  return response.json(repositoryInArray);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json("likes");
});

module.exports = app;
