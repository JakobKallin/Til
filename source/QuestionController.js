Quiz.QuestionController = function($scope, quiz) {
	$scope.quiz = quiz;
	$scope.state = {
		question: null,
		guess: null,
		correct: 0,
		incorrect: 0,
		quizCompleted: false,
		get questionNumber() {
			return quiz.questions.indexOf(this.question) + 1;
		},
		get allQuestionsAnswered() {
			return this.question === quiz.questions.last && this.guess !== null;
		},
		get reward() {
			var rewards = quiz.rewards.slice();
			rewards.sort(function(a, b) {
				return a.score - b.score;
			});
			
			var points = this.correct;
			return rewards.filter(function(reward) {
				return reward.score <= points;
			}).last;
		},
		imageCss: function(reward) {
			return null;
		}
	};
	
	$scope.optionClass = function(option) {
		if ( !$scope.state.guess ) {
			return;
		}
		
		if ( option === $scope.state.question.answer ) {
			return 'correct';
		} else if ( option === $scope.state.guess ) {
			return 'incorrect';
		}
	};
	
	$scope.giveAnswer = function(guess) {
		$scope.state.guess = guess;
		
		if ( guess === $scope.state.question.answer ) {
			$scope.state.correct += 1;
		} else {
			$scope.state.incorrect += 1;
		}
	};
	
	$scope.proceed = function() {
		var nextQuestion = quiz.questions.after($scope.state.question) || quiz.questions[0];
		
		$scope.state.question = nextQuestion;
		$scope.state.guess = null;
	};
	
	$scope.completeQuiz = function() {
		$scope.state.quizCompleted = true;
	};
	
	$scope.proceed();
};