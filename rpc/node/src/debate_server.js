var PROTO_PATH1 = __dirname + '/../../protos/debate.proto';
var PROTO_PATH2 = __dirname + '/../../protos/consultation.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition1 = protoLoader.loadSync(
    PROTO_PATH1,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var political_debate_proto = grpc.loadPackageDefinition(packageDefinition1).debate;
var packageDefinition2 = protoLoader.loadSync(
    PROTO_PATH2,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var consultation_proto = grpc.loadPackageDefinition(packageDefinition2).consultation;
console.log(consultation_proto);




function Answer(call, callback){
	// all strings should be case insensitive
	const question = call.request.question.toLowerCase();
	const answers = ["goes too far","doesn't go too far enough"];
	// if the question doesn't start with "why", "what", "how", "who"
	if(question.slice(0, 3)!== 'why' && question.slice(0, 4) !== 'what' && question.slice(0, 3) !== 'how' && question.slice(0, 3) !== 'who' && question.slice(0, 4) !== 'when'){
		callback(null, {answer: 'your 3 cent titanium tax ' + answers[Math.round(Math.random())]});
	}
	else{
		const question_sub = question.replace("you", "I").replace("your", "my");
		// make an RPC call with 'question' to the CampaignManager.Retort service
		const consultation = new consultation_proto.CampaignManager('23.236.49.28:50051',
                                       grpc.credentials.createInsecure());
		consultation.Retort({original_question: question}, function(err, response) {
			callback(null, {answer: 'You asked me ' + question_sub + ' ' + 'but I want to say that' + ' ' + response.retort + '\n'});
		});
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
