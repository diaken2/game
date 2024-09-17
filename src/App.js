import React, { useState, useEffect } from "react";
import "./App.css";
import floweySound from "./Flowey.mp3";
import endSound from "./END.mp3";
const story = {
  start: {
    text: "",
    options: [{ text: "Где я?", next: "hello" }],
  },
  hello: {
    text: "Хи-хи. Ты у меня в гостях. Хочешь поиграть?",
    options: [
      { text: "Да", next: "joy" },
      { text: "Да", next: "joy" },
    ],
  },
  joy: {
    text: "Так мило, что ты хочешь играть со мной! Но перед этим ты должен пройти небольшой тест. Все твои ответы будут влиять на нашу с тобой дальнейшую игру. Всё понятно?",
    options: [
      { text: "Да, мне всё понятно", next: "firstQuestion" },
      { text: "Нет, мне ничего не понятно", next: "noProblem" },
    ],
  },
  firstQuestion: {
    text: "Итак, первый вопрос... Ты больше любишь день или ночь?",
    options: [
      { text: "День", next: "twoQuestion" },
      { text: "Ночь", next: "twoQuestion" },
    ],
  },
  noProblem: {
    text: "Серьёзно? Ты не понял? Ну, тогда поймёшь в процессе!",
    options: [{ text: "Ладно", next: "firstQuestion" }],
  },
  twoQuestion: {
    text: "Я тоже!! Это очень удобное время суток для того, чтобы поиграть во что-нибудь весёлое. Кстати, об играх, тебе нравятся шахматы?",
    options: [
      { text: "Да", next: "threeQuestion" },
      { text: "Нет", next: "threeQuestion" },
    ],
  },
  threeQuestion: {
    text: "Хи-хи, возможно мы даже сможем подружиться. Но, наверное я рано об этом думаю. Ведь это был пока что только второй вопрос. Скажи, ты боишься высоты?",
    options: [
      { text: "Да", next: "fourQuestion" },
      { text: "Нет", next: "fourQuestion" },
    ],
  },
  fourQuestion: {
    text: "Ты буквально отражение меня. Хм... Любишь ли ты головоломки?",
    options: [
      { text: "Да", next: "fiveQuestion" },
      { text: "Нет", next: "fiveQuestion" },
    ],
  },
  fiveQuestion: {
    text: "Есть одна головоломка, которую я решала год. Она так и не решена. А что насчёт древних книг? Ты любишь книги?",
    options: [
      { text: "Да", next: "sixQuestion" },
      { text: "Нет", next: "sixQuestion" },
    ],
  },
  sixQuestion: {
    text: "Похоже что теперь мы расходимся во вкусах. Что ж, тебе нравится дождливая погода или солнечная?",
    options: [
      { text: "Дождливая", next: "sevenQuestion" },
      { text: "Солнечная", next: "sevenQuestion" },
    ],
  },
  sevenQuestion: {
    text: "Не думала, что кому-то вообще в этом мире может нравиться такая погода. Ладно. Что насчёт птиц? Тебе нравится пение птиц?",
    options: [
      { text: "Да", next: "eightQuestion" },
      { text: "Нет", next: "eightQuestion" },
    ],
  },
  eightQuestion: {
    text: "Ты странный. *вздох* Выбери наиболее привлекательный для тебя цветок.",
    options: [
      { text: "Роза", next: "nineQuestion" },
      { text: "Лилия", next: "nineQuestion" },
    ],
  },
  nineQuestion: {
    text: "Как можно любить настолько уродливый цветок? Я начинаю сомневаться в том, что мы сможем стать друзьями. Выбери наиболее привлекательный для тебя цвет.",
    options: [
      { text: "Зеленый", next: "tenQuestion" },
      { text: "Синий", next: "tenQuestion" },
    ],
  },
  tenQuestion: {
    text: "Хороший выбор. Нравится ли тебе гроза?",
    options: [
      { text: "Да", next: "elevenQuestion" },
      { text: "Нет", next: "elevenQuestion" },
    ],
  },
  elevenQuestion: {
    text: "Плохой выбор. Нравится поэзия?",
    options: [
      { text: "Да", next: "twelveQuestion" },
      { text: "Нет", next: "twelveQuestion" },
    ],
  },
  twelveQuestion: {
    text: "Ты серьёзно?.. *очередной вздох* Феи или эльфы?",
    options: [
      { text: "Феи", next: "sorry" },
      { text: "Эльфы", next: "sorry" },
    ],
  },
  sorry: {
    text: "КАК МОЖНО ИМЕТЬ НАСТОЛЬКО УЖАСНЫЙ ВКУС???",
    options: [{ text: "Прости", next: "forgiveness" }],
  },
  forgiveness: {
    text: "Конечно. Я прощу тебя. Хи-хи. Если ответишь верно на мой вопрос. И тогда мы сможем начать игру.",
    options: [{ text: "Хорошо, что за вопрос?", next: "decisiveQuestion" }],
  },
  decisiveQuestion: {
    text: "Какая моя любимая фигура?",
    options: [
      { text: "Ромб", next: "lastQuestion" },
      { text: "Квадрат", next: "lastQuestion" },
    ],
  },
  lastQuestion: {
    text: "Верно. Давай начнём нашу игру. Кстати, не хочешь ли выпить чашечку кофе? Или ты предпочитаешь чай?",
    options: [
      { text: "Кофе", next: "coffee" },
      { text: "Чай", next: "tea" },
    ],
  },
  coffee: {
    text: "*налила тебе чашечку кофе* Твои ответы будут влиять на нашу с тобой игру. Помнишь, я спросила тебя, любишь ли ты день или ночь?",
    options: [{ text: "Да", next: "deception" }],
  },
  tea: {
    text: "*налила тебе чашечку чая* Твои ответы будут влиять на нашу с тобой игру. Помнишь, я спросила тебя, любишь ли ты день или ночь?",
    options: [{ text: "Да", next: "deception" }],
  },
  deception: {
    text: "ТВОИ ОТВЕТЫ НИ НА ЧТО НЕ ВЛИЯЛИ. ТЫ ПРОСТО СИДЕЛ И ДУМАЛ НАД ГЛУПЫМИ ВОПРОСАМИ БЕЗ КАКОГО-ЛИБО СМЫСЛА, ТРАТЯ СВОЁ ВРЕМЯ ВПУСТУЮ. ЧТО БЫ ТЫ НИ ОТВЕЧАЛ, Я БЫ ГОВОРИЛА ОДНО И ТО ЖЕ. ЕДИНСТВЕННЫЙ ВОПРОС, КОТОРЫЙ ИМЕЛ ЗДЕСЬ ХОТЬ КАКУЮ-ТО ДОЛЮ СМЫСЛА, ЭТО ПОЛУЧИШЬ ТЫ КОФЕ ИЛИ ЖЕ ЧАЙ. ИМЕННО ТАКУЮ ИГРУ ТЫ И ЗАСЛУЖИВАЕШЬ. БОЛЬШЕ НЕ ЗАХОДИ СЮДА.",
  },
};

const App = () => {
  const [scene, setScene] = useState(story.start);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let i = -1;
    setText(""); // Очистка текста перед началом
    const speed = scene.text === story.deception.text ? 300 : 70;
    const audio = new Audio(floweySound);
    const endAudio = new Audio(endSound);

    if (scene.text === story.deception.text) {
      endAudio.play();
      endAudio.muted = true;
      setTimeout(() => {
        endAudio.muted = false;
      }, 7000);
    }

    const type = () => {
      if (i < scene.text.length) {
        setText((prev) => prev + scene.text.charAt(i));
        if (scene.text === story.deception.text) {
          endAudio.play();
        } else {
          audio.play();
        }
        i++;
        setTimeout(type, speed);
      } else {
        if (scene.text !== story.deception.text) {
          audio.pause();
        }
        setTyping(false);
      }
    };

    type();
  }, [scene]);

  const handleOptionClick = (next) => {
    setScene(story[next]);
    setTyping(true);
  };

  return (
    <div className="body">
      <div id="scene-text" className="sceneText">
        {text}
      </div>
      <div id="options" className="options">
        {!typing &&
          scene.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.next)}
              className={
                option.text === "Зеленый"
                  ? "green"
                  : option.text === "Синий"
                  ? "blue"
                  : ""
              }
            >
              {option.text}
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;
