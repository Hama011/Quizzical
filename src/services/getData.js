export default function getData(quizOptions) {
  const { category, difficulty, type } = quizOptions;
  let queryParams = '';
  if (category) {
    queryParams += `&category=${category}`;
  }
  if (difficulty) {
    queryParams += `&difficulty=${difficulty}`;
  }
  if (type) {
    queryParams += `&type=${type}`;
  }

  const api = `https://opentdb.com/api.php?amount=5${queryParams}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => console.error("Error fetching trivia data:", error));
}
