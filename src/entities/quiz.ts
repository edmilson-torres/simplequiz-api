import Question from './question';

interface Quiz {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Array<Question>;
}

export default Quiz;
