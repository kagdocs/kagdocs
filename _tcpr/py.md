---
title: Using TCPR with Python 3
position: 3
---

In order to use TCP sockets in Python, you will need to import the `socket` library.  
This script will read chat and console logs from TCPR, and periodically broadcast a message to players.
The first argument passed to the script will be the ip address and the second argument will be the port to connect to, and read the password from the standard input.

~~~ python
#!/usr/bin/python

import threading # Timer
import socket # TCP sockets
import sys # argv and exit
import random # randint

def sendRandomMessages(sock, messages):
	# Get the function to be called every 5 seconds
	threading.Timer(5, sendRandomMessages, [sock, messages]).start()
	# Messages also are terminated by \n.
	sock.send(("/msg " + messages[random.randint(0, len(messages) - 1)] + "\n").encode())

if len(sys.argv) < 3:
	print("Usage: tcpr.py [server] [port]")
	sys.exit()

sock = socket.socket()
sock.connect((sys.argv[1], int(sys.argv[2])))

pwd = input("[TCPR] Enter password (leave empty for no login): ")
islogged = (len(pwd) != 0)

if islogged:
	# Passowrds are terminated by \n.
	sock.send((pwd + "\n").encode())
	sendRandomMessages(sock, ["Hello world!", "Hello!", "Hi!", "Welcome!"])

while 1:
	# Receive 16385 bytes, which should be the maximum amount of data TCPR can send
	data = sock.recv(16385).decode()

	# Exit when no data was received on a message.
	# This happens when the remote closes the connection,
	# generally because the server is closing or because the wrong password was entered.
	if len(data) == 0:
		print("[TCPR] Terminated")
		sys.exit()

	# Print the log to the standard output
	# TCPR responses already ends with '\n', so have an empty end string not to have double newline.
	print(data, end='')
~~~

Example usage: `python tcpr.py localhost 50301`

As expected, clients receive the broadcasted message correctly. You should see something like this in the chat console:

	* Hi!
	* Hello!
	* Hello world!

You should also receive player messages along with other servers logs, including TCPR feedback:

	[19:13:31] RCON command from 127.0.0.1:41620 :
	[19:13:31] /msg Welcome!
	[19:13:31]
	[19:13:36] RCON command from 127.0.0.1:41620 :
	[19:13:36] /msg Hello!
	[19:13:36]
	[19:13:37] <Asu> hi
	[19:13:38] <Asu> * hello TCPR *
