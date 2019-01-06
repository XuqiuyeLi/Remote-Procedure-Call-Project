# Remote-Procedure-Call-Project

This project created an RPC client and server that simulate political debates with gRPC framework in Node.js.

# Setup
	- must download the Remote-Procedure-Call-Project folder under ex3 and run this program locally, otherwise the paths for both protos in client.js and server.js will likely be wrong
	- make sure your node: version 4.0.0 or higher
	- Go to src folder in ex3 `$ cd rpc/node/src `
	- Install all the denpendencies `$ npm install`

# Build Server Code
	1. Generate RPC libraries for debate.proto and consultation.proto in protos
	2. Write a function called 'Answer' which takes 'question' from client, and output an answer to the client 
	3. Write a function called 'Elaborate' which takes 'topics & numbers' from client, and output an answer to the client 
	4. In the main function, set up the ProtoService and bind server to localhost, then start the server.

# Build Client Code
	1. Generate RPC libraries for debate.proto in protos
	2. Build commandline tools for listening to user input 
	3. Pass the 'question' command to answer method, and log out the 'answer' from the server
	4. Pass the 'topic' and 'numbers' commands to elaborate method, and log out the 'answer' from the server

# How to run the server on localhost
	- Run the server first `$ node debate_client.js` in terminal
	- In another terminal, run the client `$ node debate_client.js` with commands
		- client command example for answer: `$ node debate_client.js answer "When is Christmas"`
		- client command example for elaborate: `$ node debate_client.js elaborate "NYU" 3 2 1`
		- ERROR: program will end if invalid commandline format
		- IMPORTANT: enter 0 as blah_run command to indicate no runs
