
# Sentence Constructor App

A React application with JSON server backend for filling blank spaces in sentences.

## Project Structure
project/
|── public/data.json
├── src/
│ ├── components/ 
│ ├── types/ # TypeScript type definitions
│ ├── App.tsx # Main application component
│ └── main.tsx # Application entry point
└── package.json # Project dependencies

## 2. Data Fetching

<!--
  The data.json file is placed inside the public folder.
  Since files in public/ are statically served, we can fetch it using a simple relative path.
-->

```ts
await fetch("/data.json");
```

## 3. Component Documentation

### BlankSpaceQuestion.tsx

```typescript
/**
 * Renders a question with blank spaces to be filled by user selection
 * 
 * @param {Object} props - Component props
 * @param {Question} props.question - The question data object
 * @param {(answers: string[]) => void} props.onAnswerSubmit - Callback when answer is submitted
 * @param {() => void} props.onTimeout - Callback when timer expires
 * @param {number} props.timeLimit - Time limit in seconds
 * 
 * @param {boolean} props.fadeIn - To perform fade in animation
 * 
 * @param {number} props.questionIndex - To show question number
 * 
 * @param {number} props.totalQuestions - Total questions
 * 
 * @returns {JSX.Element} The rendered question component with interactive blanks
 */
const BlankSpaceQuestion: React.FC<BlankSpaceQuestionProps> = ({
  question,
  onAnswerSubmit,
  onTimeout,
  timeLimit,
  fadeIn,
  questionIndex,
  totalQuestions
}) => {
  // Component implementation...
}

```
### FeedbackScreen.tsx
```typescript
/**
 * Displays quiz results with detailed feedback for each question
 * 
 * @param {Object} props - Component props
 * @param {UserAnswer[]} props.userAnswers - Array of user's answers with correctness status
 * @param {Question[]} props.questions - Original quiz questions array
 * @param {() => void} props.onRestart - Callback function to restart the quiz
 * 
 * @returns {JSX.Element} The feedback screen showing:
 * - Overall score (correct/total and percentage)
 * - Visual progress bar
 * - Detailed breakdown per question showing:
 *   ✓ Correct answers with green highlight
 *   ✗ Incorrect answers with red highlight and correct solution
 * - Action buttons for restarting quiz or returning home
 * 
 * @example
 * <FeedbackScreen 
 *   userAnswers={userAnswers}
 *   questions={questions}
 *   onRestart={handleRestart}
 * />
 */
const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  userAnswers,
  questions,
  onRestart,
}) => {
  // Component implementation...
}
```
 ### Timer Component

```typescript
/**
 * Self-contained countdown timer with circular display
 * 
 * @param {Object} props - Component properties
 * @param {number} props.timeLimit - Initial time in seconds (e.g. 30)
 * @param {function} props.onTimeout - Callback when timer reaches zero:
 *   - Automatically records empty answers for current question
 *   - Marks answer as incorrect
 *   - Advances to next question
 * @param {number} props.questionIndex - Reset trigger for new questions
 * 
 * @features
 * - Auto-resets when questionIndex changes
 * - Clean MM:SS formatting
 * - Responsive design (mobile/desktop)
 * - Automatic timeout callback
 * 
 * @example
 * <Timer 
 *   timeLimit={30}
 *   onTimeout={handleTimeout} 
 *   questionIndex={currentQuestion}
 * />
 */
const Timer: React.FC<TimerProps> = ({ 
  timeLimit,
  questionIndex,
  onTimeout 
}) => {
  // ...implementation
}
```
## Function Documentation

### handleOptionSelect

```ts
/**
 * Handles the user's selection of a word to fill a blank in the question.
 * - Finds the first available blank slot (i.e., an empty string in selectedOptions).
 * - Inserts the selected word into the first empty slot.
 * - If no empty slot is found, the word is appended at the end.
 * - Updates the selected options state.
 * - Removes the selected word from the available options.
 * 
 * @param {string} word - The word selected by the user to fill in a blank.
 * 
 * @returns {void} Updates component state:
 * - Adds the word to selectedOptions.
 * - Filters the word out from availableOptions.
 * 
 */
const handleOptionSelect = (word: string) => {
  // Find the first empty slot (if any)

  // Determine the new selected options
};

```
### handleBlankClick

```ts
/**
 * Handles the event when a user clicks on a filled blank.
 
 * @param {number} index - The index of the blank that was clicked.
 * 
 * @returns {void} Updates component state:
 * - Removes the selected word from selectedOptions at the given index.
 * - Restores the word to availableOptions.
 * 
 * @example
 * handleBlankClick(2); // Clears the 3rd blank and adds the word back to options
 */
const handleBlankClick = (index: number) => {

  // Create new selected options with the clicked blank emptied


  // Add the removed word back to available options
};
```

### renderQuestionWithBlanks

```ts
/**
 * Renders the question text, splitting it at each blank (represented by '_____________') and displaying blanks
 * that can be filled by the user with selected options.
 * 
 * - Splits the question into parts around the '_____________' placeholder.
 * - Maps over each part, rendering the question text and any filled blanks.
 * - If an option is selected for a blank, it renders a button with the selected word; otherwise, it shows the placeholder.
 * - If a filled blank is clicked, it will call `handleBlankClick` to remove the word and return it to the available options.
 * 
 * @returns {JSX.Element[]} An array of JSX elements that represent the question with blanks.
 * - Each blank is rendered as a clickable button when filled.
 * - If the blank is empty, it is shown as '_____________'.
 * 
 */
const renderQuestionWithBlanks = () => {
  // ...implementation
};
```

### handleAnswerSubmit

```ts
/**
 * Handles the submission of an answer for the current question.
 * 
 * - Compares the submitted answers with the correct answers for the current question.
 * - If all answers match, the submission is considered correct.
 * - Creates a new `UserAnswer` object containing the question ID, submitted answers, and correctness status.
 * - Updates the `userAnswers` state with the new answer submission.
 * - Advances to the next question if there are more questions remaining; otherwise, it marks the quiz as completed.
 * 
 * @param {string[]} answers - An array of answers submitted by the user for the current question.
 * 
 * @returns {void} Updates the component state:
 * - Adds the answer to `userAnswers`.
 * - Moves to the next question or completes the quiz.
 */ 

const handleAnswerSubmit = (answers: string[]) => {
  // implementation
};
