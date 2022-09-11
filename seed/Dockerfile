FROM mongo:latest

COPY users.json /users.json
COPY quizzes.json /quizzes.json
CMD mongoimport --uri mongodb://docker:mongopw@mongodb:27017/simpleQuiz?authSource=admin --collection users --type json --file /users.json --jsonArray && mongoimport --uri mongodb://docker:mongopw@mongodb:27017/simpleQuiz?authSource=admin --collection quizzes --type json --file /quizzes.json --jsonArray