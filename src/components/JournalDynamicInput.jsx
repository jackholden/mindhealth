import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import useColours from "../hooks/useColours";
import useGlobalStyles from "../hooks/useGlobalStyles";

const questions = [
  `Why are you feeling $REPLACE?`,
  `What is causing you to feel $REPLACE?`,
  `It's ok to feel $REPLACE, what caused this?`,
  `What do you think has caused you to feel $REPLACE?`,
  `Write down what's caused these feelings of $REPLACE?`,
  `With your $REPLACE, what/who do you think is the root cause?`,
  `What is making you so $REPLACE?`,
];

const JournalDynamicInput = ({ data, onChange }) => {
  const [questionInputs, setQuestionInputs] = useState(
    Array.from({ length: data.length }, (_, i) => ({
      value: "",
      question: randomQuestion(data[i]),
    }))
  );

  const colours = useColours();
  const styles = useGlobalStyles();

  function randomQuestion(word) {
    const question = questions[Math.floor(Math.random() * questions.length)];
    return question.replace("$REPLACE", word);
  }

  const handleChangeText = (index, text) => {
    const newInputs = [...questionInputs];
    newInputs[index].value = text;
    setQuestionInputs(newInputs);
  };

  const handleSubmit = () => {
    onChange(questionInputs);
  };

  return (
    <View>
      {questionInputs.map((input, index) => (
        <View key={index}>
          <Text style={{ marginTop: 10, marginBottom: 5 }}>
            {input.question}
          </Text>
          <TextInput
            key={index}
            multiline={true}
            // numberOfLines={4}
            value={input.value}
            onChangeText={(text) => handleChangeText(index, text)}
            onBlur={handleSubmit}
            style={styles.input}
          />
        </View>
      ))}
    </View>
  );
};

export default JournalDynamicInput;
