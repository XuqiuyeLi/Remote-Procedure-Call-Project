var PROTO_PATH = __dirname + '/../../protos/debate.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var political_debate_proto = grpc.loadPackageDefinition(packageDefinition).debate;





function Answer(call, callback){
	// all strings should be case insensitive
	const question = call.request.question.toLowerCase();
	console.log(question.slice(0,4));
	console.log(question.slice(0,4) === 'what');
	const answers = ["goes too far","doesn't go too far enough"];
	// if the question doesn't start with "why", "what", "how", "who"
	if(question.slice(0, 3)!== 'why' && question.slice(0, 4) !== 'what' && question.slice(0, 3) !== 'how' && question.slice(0, 3) !== 'who' && question.slice(0, 4) !== 'when'){
		callback(null, {answer: 'your 3 cent titanium tax ' + answers[Math.round(Math.random())]});
	}
	else{
		const question_sub = question.replace("you", "I").replace("your", "my");
		// make an RPC call with 'question' to the CampaignManager.Retort service
		callback(null, {answer: 'You asked me ' + question_sub + ' but I want to say that I really like Japanese food'});
	}
}


function Elaborate(call, callback){
	const numbers = [...call.request.blah_run];
	const topic = call.request.topic;
	// when blah_run is empty
	if(numbers[0] === 0){
		console.log("no runs, just topic printed");
		callback(null, {answer: topic});
	}
	// when blah_run has one run, "topic" is printed after it
	else if(numbers.length === 1){
		let string = '';
		for(let i = 0; i < numbers[0]; i++){
			string += 'blah ';
		}
		callback(null, {answer: string + topic});
	}
	// more than one run
	else if(numbers.length > 1){
		let string = '';
		let x = 0;
		while( x < numbers.length - 1){
			for(let i = 0; i < numbers[x]; i++){
				string += 'blah ';
			}
			string += topic + ' ';
			x++;
		}
		for(let i = 0; i < numbers[x]; i++){
			string += 'blah ';
		}	
		callback(null, {answer: string});
	}
}



function main() {
  const server = new grpc.Server();
  server.addProtoService(political_debate_proto.Candidate.service,
                         {Answer: Answer, Elaborate: Elaborate});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
