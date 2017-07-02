---
title: The TCPR protocol
position: 2
---

TCPR is a simple TCP protocol. Messages between the TCPR client and server are plain text.

Authentication is performed through plain text. Whenever you want to auth, simply send the RCON password (as defined by `sv_rconpassword`) terminated by a newline character `\n` to the server.  
If the wrong password was entered, the connection will be closed.

It is no more required to auth to receive chat and console logs from the remote server, including `tcpr()` messages.  
You can receive logs, but not send commands when you are not authenticated (so avoid sending sensitive data).
{: .info }

Received messages are generally always prefixed by the current time, in the `[HH:MM:SS] ` format.

There seems to be a weird exception to the `[HH:MM:SS] ` format: When the server shuts down, it sends `HH:MM:SSTCPR: server shutting down.` without the brackets `[]` and the space following the end bracket.
{: .warning }

The TCPR server shouldn't be able to send messages (or lines?) [longer than ~16k bytes (probably 16384)](https://forum.thd.vg/threads/build-1865-engine-update-sponges-in-tdm-windows-modded-server-fixes.25483/).  
It is possible to get lines over that size to be truncated or even not sent at all.
{: .error }

It is possible that the server sends multiple messages within a packet, separated by newline characters.  
If you want to parse server output, you might need to split the server output by the newline character.
{: .info }

You can send commands terminated by the newline `\n` character. KAG built-in commands can be invoked as long as they're prefixed by a slash `/` character, and arbitrary AngelScript code simply does not begin by `/`. In other words, commands works the same way as from the RCON console, minus the `/rcon` command that is run client-side.  
You may get a list of commands using `/help` or `/list`.

`" "` within commands is broken through RCON, but it works fine through TCPR.
{: .info }

A recent KAG build exposes `tcpr()` to the scripts, which will send messages exclusively to TCPR clients (and so will not be logged in RCON or in file `console` logs).  
This behavior can be altered by the `sv_print_tcpr_specific` autoconfig variable that, when enabled, will log `tcpr()` sent messages.  
`sv_tcpr_everything` filters out non-TCPR messages for TCPR clients, in which case only messages sent by `tcpr()` and some specific info (such as the server shutting down) will be received by TCPR clients.

Remember that you can run commands from TCPR: You can set `sv_tcpr_everything` by sending `/sv_tcpr_everything 1`.
{: .info }
