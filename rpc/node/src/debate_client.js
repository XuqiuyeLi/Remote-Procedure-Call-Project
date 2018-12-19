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





function main() {
  const client = new political_debate_proto.Candidate('localhost:50051',
                                       grpc.credentials.createInsecure());
  
  let question, topic, numbers;
  if (process.argv.length === 4) {
  	if(process.argv[2] === 'answer'){
  		question = process.argv[3];
  	}
    else{
      console.log("Invalid command lines\n");
    }
  } else if (process.argv.length >= 4) {
    if(process.argv[2] === 'elaborate'){
  		topic = process.argv[3];
  		numbers = [...process.argv.slice(4)];
  	}
    else{
      console.log("Invalid command lines\n");
    }
  }
  else{
  	console.log("Only take 2 args for answer, 3 args for elaborate!\n");
  	return -1;
  }
  
  if(question !== undefined){
    client.Answer({question: question}, function(err, response) {
      console.log('Answer:', response.answer);
    });
  }
  if(topic !== undefined && numbers !== undefined){
    client.Elaborate({topic: topic, blah_run: numbers}, function(err, response) {
      console.log('Elaborated Answer:', response.answer);
    }); 
  }

}


main();