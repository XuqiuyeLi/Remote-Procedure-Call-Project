function main() {
  const client = new hello_proto.Candidate('localhost:50051',
                                       grpc.credentials.createInsecure());
  client.Answer({question: 'What do you want your birthday present to be?'}, function(err, response) {
    console.log('Original Answer:', response.answer);
  });
  client.Elaborate({topic: 'Detective Conan', blah_run: [3,2,1]}, function(err, response) {
    console.log('Elaborated Answer:', response.answer);
  });
}