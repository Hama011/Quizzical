export default async function getData(quizOptions) {
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
  try {
    const res = await fetch(api);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw error;  // This will ensure the error is propagated to the caller
  }
}
