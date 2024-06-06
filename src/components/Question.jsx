import { decode } from "html-entities";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function Question({
  idx,
  data,
  handleOptionClick,
  selectedOption,
  checkMode,
}) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const answers = [...data.incorrect_answers, data.correct_answer];
    if (data.type === "multiple") {
      setAnswers(_.shuffle(answers));
    } else {
      setAnswers(answers);
    }
  }, [data]);

  return (
    <div>
      <p className="question">{decode(data.question)}</p>
      <div className="options-container">
        {answers.map((answer, index) => {
          return (
            <p
              key={index}
              className={
                "option " +
                (
                  checkMode
                  ? selectedOption === decode(answer)
                    ? selectedOption === decode(data.correct_answer) ? "correct-answer" : "wrong-answer"
                    : answer === data.correct_answer && "correct-answer"
                  : selectedOption === decode(answer) && "selected"
                )
              }
              onClick={(event) => handleOptionClick(event, idx)}
            >
              {decode(answer)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
