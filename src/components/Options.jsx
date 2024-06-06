import { useState } from "react";
import blob from "../assets/images/blob.png";
import ylob from "../assets/images/ylob.png";
import { useNavigate } from "react-router-dom";

function Options() {
  const [quizOptions, setQuizOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
  });

  function handleOptions(event) {
    const { name, value } = event.target;
    setQuizOptions((preveQO) => ({
      ...preveQO,
      [name]: value,
    }));
  }

  const navigate = useNavigate();

  const handleQuizStart = () => {
    navigate("/quiz", { state: { quizOptions } });
  }

  return (
    <div className="start-page">
      <img src={ylob} className="top-img" />
      <h1 className="title">Quizzical</h1>
      <p className="discription">Your knowledge journey begins here!</p>
      <div className="option-container">
        <label htmlFor="category" className="labels">
          Category :{" "}
        </label>
        <select
          name="category"
          id="category"
          className="quiz-selection"
          onChange={handleOptions}
          value={quizOptions.category}
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
      </div>
      <div className="option-container">
        <label htmlFor="difficulty" className="labels">
          Difficulty :{" "}
        </label>
        <select
          name="difficulty"
          id="difficulty"
          className="quiz-selection"
          onChange={handleOptions}
          value={quizOptions.difficulty}
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="meduim">Meduim</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="option-container">
        <label htmlFor="type" className="labels">
          Type :{" "}
        </label>
        <select
          name="type"
          id="type"
          className="quiz-selection"
          onChange={handleOptions}
          value={quizOptions.type}
        >
          <option value="">Any Type</option>
          <option value="multiple">Multiple choise</option>
          <option value="boolean">True / False</option>
        </select>
      </div>
      <button className="btn" onClick={handleQuizStart}>
        Start Quiz
      </button>
      <img src={blob} className="bottom-img" />
    </div>
  );
}

export default Options;
