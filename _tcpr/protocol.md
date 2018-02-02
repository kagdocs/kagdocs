---
title: The TCPR protocol
position: 2
---

TCPR is a simple TCP protocol. Messages between the TCPR client and server are plain text.

To auth, you have to send the RCON password in plain text (as defined by `sv_rconpassword`) terminated by a newline.
When the wrong password is entered, the connection is closed.

The TCPR server will determine the newline type depending on what you sent during auth.
For example, you can use the newline character `\n` as well as `\r\n` (CRLF) during auth. The setting will then be used for [the rest of the session](https://forum.thd.vg/threads/complete-tcpr-documentation.27028/#post-400427).
{: .info }

Received lines are generally always prefixed by the current time, in the `[HH:MM:SS] ` format.

The TCPR server will split lines [longer than ~16k bytes](https://forum.thd.vg/threads/build-1865-engine-update-sponges-in-tdm-windows-modded-server-fixes.25483/).  
This limit might be extended in the future, but [avoid](https://forum.thd.vg/threads/complete-tcpr-documentation.27028/#post-400427) sending that much data all at once.
{: .error }

Because TCP is stream-based, your network library may return you a packet that does not necessarily contain an entire TCPR message or that may contain multiple ones. To avoid such issues, you should read TCPR messages until your newline character.
{: .info }

Commands works the same way as from the RCON console, omitting the `/rcon` command. You can send commands terminated by a newline. KAG built-in commands are prefixed by a slash `/` character. To send AngelScript code, omit the slash.
You may get a list of commands using `/help` or `/list`.

The doublequote `"` character is broken in the ingame console, but works through TCPR.
{: .info }

Scripts can use `tcpr()` to send messages exclusively to TCPR clients, but not to logs.
You can set `sv_print_tcpr_specific` to log `tcpr()`-sent messages.  
`sv_tcpr_everything` filters out non-TCPR messages for TCPR clients, in which case only messages sent by `tcpr()` and some messages (such as the server shutting down) will be received by TCPR clients.

Remember that you can run commands from TCPR: You can set `sv_tcpr_everything` by sending `/sv_tcpr_everything 1`.
{: .info }
