import { useEffect, useState } from "react";
import getData from "../services/getData";
import blob2 from "../assets/images/blob2.png";
import ylob2 from "../assets/images/ylob2.png";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";
import { TiArrowBack } from "react-icons/ti";

export default function Quiz() {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { quizOptions } = location.state;
  const [selectedOptions, setSelectedOptions] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [checkMode, setCheckMode] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = () => {
    setCheckMode(false);
    setSelectedOptions({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    });
    getData(quizOptions).then((data) => setData(data));
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  const handleOptionsClick = (event, idx) => {
    setSelectedOptions((preveData) => ({
      ...preveData,
      [idx]: event.target.innerText,
    }));
  };

  let questions = [];
  if (data) {
    questions = data.map((data, index) => (
      <Question
        key={index}
        idx={index}
        data={data}
        handleOptionClick={handleOptionsClick}
        selectedOption={selectedOptions[index]}
        checkMode={checkMode}
      />
    ));
  }

  const handleCheckAnswers = () => {
    setCorrectAnswers(
      data
        .map((option, index) => {
          return option.correct_answer === selectedOptions[index];
        })
        .filter(Boolean).length
    );
    setCheckMode(true);
  };

  let message;
  if (checkMode) {
    if (correctAnswers === 5) {
      message = "Perfect score! You're a quiz master! ";
    } else if (correctAnswers == 4) {
      message = "Great job! You have a solid understanding. ";
    } else if (correctAnswers == 3) {
      message = "Good effort! Keep practicing to improve. ";
    } else {
      message = "Don't worry, keep trying and you'll get better! ";
    }
  }

  return (
    <div className="quiz-container">
      <img src={ylob2} className="top-img" />
      <TiArrowBack className="goback-icon" onClick={handleGoBack} />
      {questions}
      <div className="button-container">
        {checkMode && (
          <p className="result">
            {message} {correctAnswers}/5
          </p>
        )}
        <button
          className="btn check"
          onClick={checkMode ? requestData : handleCheckAnswers}
        >
          {checkMode ? "Play Again" : "Check Answers"}
        </button>
      </div>
      <img src={blob2} className="bottom-img" />
    </div>
  );
}
