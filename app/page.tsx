"use client";
import { useState } from "react";

type Language = {
  code: string;
  label: string;
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [language, setLanguage] = useState<string>("en-US");

  const languages: Language[] = [
    { code: "en-US", label: "English (US)" },
    { code: "de-DE", label: "German" },
    { code: "es-ES", label: "Spanish" },
  ];

  const exampleSentences: { [key: string]: string[] } = {
    "en-US": [
      "The quick brown fox jumps over the lazy dog.",
      "She sells sea shells by the sea shore.",
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
      "The early bird catches the worm.",
      "A picture is worth a thousand words.",
      "Actions speak louder than words.",
      "Better late than never.",
      "Brevity is the soul of wit.",
      "Curiosity killed the cat.",
      "Don’t count your chickens before they hatch.",
      "Every cloud has a silver lining.",
      "Good things come to those who wait.",
      "Ignorance is bliss.",
      "It’s always darkest before the dawn.",
      "Knowledge is power.",
      "Laughter is the best medicine.",
      "Look before you leap.",
      "Time and tide wait for no man.",
      "Two wrongs don’t make a right.",
      "When in Rome, do as the Romans do.",
    ],
    "de-DE": [
      "Der frühe Vogel fängt den Wurm.",
      "Übung macht den Meister.",
      "Viele Köche verderben den Brei.",
      "Ein Bild sagt mehr als tausend Worte.",
      "Aller Anfang ist schwer.",
      "Besser spät als nie.",
      "Die Katze lässt das Mausen nicht.",
      "Stille Wasser sind tief.",
      "Wer A sagt, muss auch B sagen.",
      "Wo ein Wille ist, ist auch ein Weg.",
      "Man soll den Tag nicht vor dem Abend loben.",
      "Es ist noch kein Meister vom Himmel gefallen.",
      "Hochmut kommt vor dem Fall.",
      "Kleine Geschenke erhalten die Freundschaft.",
      "Reden ist Silber, Schweigen ist Gold.",
      "Wer nicht wagt, der nicht gewinnt.",
      "Der Apfel fällt nicht weit vom Stamm.",
      "Guter Rat ist teuer.",
      "In der Not frisst der Teufel Fliegen.",
      "Müßiggang ist aller Laster Anfang.",
    ],
    "es-ES": [
      "Más vale tarde que nunca.",
      "El que madruga, Dios lo ayuda.",
      "A caballo regalado no le mires el diente.",
      "Más vale prevenir que curar.",
      "Ojos que no ven, corazón que no siente.",
      "No hay mal que por bien no venga.",
      "A buen entendedor pocas palabras bastan.",
      "Del dicho al hecho hay mucho trecho.",
      "En casa de herrero, cuchillo de palo.",
      "Cuando el río suena, agua lleva.",
      "El hábito no hace al monje.",
      "Dime con quién andas y te diré quién eres.",
      "Cría cuervos y te sacarán los ojos.",
      "Más vale pájaro en mano que ciento volando.",
      "No todo lo que brilla es oro.",
      "Quien mucho abarca, poco aprieta.",
      "A falta de pan, buenas son tortas.",
      "La avaricia rompe el saco.",
      "Zapatero a tus zapatos.",
      "No hay peor ciego que el que no quiere ver.",
    ],
  };

  const handleSpeak = (): void => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    } else {
      alert("Web Speech API is not supported in this browser.");
    }
  };

  return (
    <div className="p-5 font-sans bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-5 ">
        Text-to-Speech with Web Speech API
      </h1>
      <div className="mb-4">
        <label htmlFor="language" className="font-medium mr-2">
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-2"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="examples" className="font-medium mr-2">
          Select Example Sentence:
        </label>
        <select
          id="examples"
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">-- Select a sentence --</option>
          {exampleSentences[language]?.map((sentence, index) => (
            <option key={index} value={sentence}>
              {sentence}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="text" className="font-medium mr-2">
          Enter Text:
        </label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        onClick={handleSpeak}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Speak
      </button>
    </div>
  );
}
