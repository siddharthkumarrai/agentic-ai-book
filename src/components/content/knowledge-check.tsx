"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";

export type KnowledgeCheckOption = {
  value: string;
  label: string;
};

export type KnowledgeCheckQuestion = {
  id: string;
  prompt: string;
  options: KnowledgeCheckOption[];
  correctOption: string;
  explanation: string;
};

type KnowledgeCheckProps = {
  questions: KnowledgeCheckQuestion[];
};

export function KnowledgeCheck({ questions = [] }: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;
  const score = questions.filter(
    (question) => answers[question.id] === question.correctOption,
  ).length;

  function selectAnswer(questionId: string, optionValue: string) {
    if (submitted) return;
    setAnswers((current) => ({
      ...current,
      [questionId]: optionValue,
    }));
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className="knowledge-check" aria-labelledby="knowledge-check-heading">
      <div className="knowledge-check-header">
        <div>
          <p className="eyebrow">Knowledge check</p>
          <h2 id="knowledge-check-heading" className="knowledge-check-title">
            Test your understanding
          </h2>
        </div>
        {submitted ? (
          <span className="knowledge-check-score" aria-live="polite">
            Score: {score}/{questions.length}
          </span>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        {questions.map((question, questionIndex) => {
          const selected = answers[question.id];
          return (
            <fieldset key={question.id} className="knowledge-check-question">
              <legend>
                <span className="knowledge-check-number">
                  {questionIndex + 1}
                </span>
                {question.prompt}
              </legend>

              <div className="knowledge-check-options">
                {question.options.map((option) => {
                  const isSelected = selected === option.value;
                  const isCorrect = submitted && option.value === question.correctOption;
                  const isIncorrect =
                    submitted && isSelected && option.value !== question.correctOption;

                  return (
                    <label
                      key={option.value}
                      className={[
                        "knowledge-check-option",
                        isSelected ? "is-selected" : "",
                        isCorrect ? "is-correct" : "",
                        isIncorrect ? "is-incorrect" : "",
                      ].join(" ").trim()}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => selectAnswer(question.id, option.value)}
                      />
                      <span>{option.label}</span>
                      {isCorrect ? (
                        <CheckCircle2 aria-label="Correct answer" size={18} />
                      ) : null}
                      {isIncorrect ? (
                        <XCircle aria-label="Incorrect answer" size={18} />
                      ) : null}
                    </label>
                  );
                })}
              </div>

              {submitted ? (
                <div
                  className={
                    selected === question.correctOption
                      ? "knowledge-check-feedback is-correct"
                      : "knowledge-check-feedback is-incorrect"
                  }
                  aria-live="polite"
                >
                  <strong>
                    {selected === question.correctOption
                      ? "Correct"
                      : "Incorrect"}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              ) : null}
            </fieldset>
          );
        })}

        <div className="knowledge-check-actions">
          {submitted ? (
            <button type="button" className="secondary-button" onClick={retry}>
              <RotateCcw aria-hidden="true" size={16} />
              Retry
            </button>
          ) : (
            <button
              type="submit"
              className="primary-button"
              disabled={answeredCount !== questions.length}
            >
              Submit answers
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
