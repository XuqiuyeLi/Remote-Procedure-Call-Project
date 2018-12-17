syntax = "proto3";

option java_package = "net.yairsovran.consultation";

service Candidate {
  // Sends a greeting
  rpc Answer (AnswerRequest) returns (AnswerReply) {}
  rpc Elaborate (HelloRequest) returns (HelloReply) {}
}

// The request message containing the question.
message AnswerRequest {
  required string question = 1;
}

// The response message containing the answer
message AnswerReply {
  required string answer = 1;
}


// The request message containing the topic and repeated integer.
message ElaborateRequest {
  required string topic = 1;
  repeated int32 blah_run = 1;
}

// The response message containing the answer
message ElaborateReply {
  required string answer = 1;
}