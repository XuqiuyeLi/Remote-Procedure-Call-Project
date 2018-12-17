function Answer(call, callback){
	// all strings should be case insensitive
	const question = call.request.question.toLowerCase();
	const answers[] = ["goes too far","doesn't go too far enough"];
	// if the question doesn't start with "why", "what", "how", "who"
	if(question.slice(0, 3)!== 'why' || question.slice(0, 4) !== 'what' || question.slice(0, 3) !== 'how' || question.slice(0, 3) !== 'who'){
		callback(null, {answer: 'your 3 cent titanium tax ' + answers[Math.round(Math.random())]});
	}
	else{
		const question_sub = question.replace("you", "I").replace("your", "my");
		// make an RPC call with 'question' to the CampaignManager.Retort service
		const retort = ?;
		callback(null, {answer: 'You asked me ' + question_sub + 'but I want to say that' + retort});
	}
}


function Elaborate(call, callback){
	const numbers = [...call.request.blah_run];
	const topic = call.request.topic;
	// when blah_run is empty
	if(numbers === NULL){
		callback(null, {answer: topic});
	}
	// when blah_run has one run
	else if(numbers.length === 1){
		let string = '';
		for(let i = 0; i < numbers[0]; i++){
			string += 'blah ';
		}
		callback(null, {answer: string + topic});
	}
	else{
		let string = '';
		numbers.forEach(number => {
			for(let i = 0; i < number; i++){
				string += 'blah ';
			}
			string += topic;
		})
		callback(null, {answer: string});
	}
}



function main() {
  const server = new grpc.Server();
  server.addProtoService(hello_proto.Candidate.service,
                         {Answer: Answer, Elaborate: Elaborate});
  server.bind('23.236.49.28:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}
