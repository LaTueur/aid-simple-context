# AID Simple Context
A simple set of commands to that keep the AI on track and ensures it doesn't forget what's important!  

## Usage

### Script Control

* `/show` makes the HUD visible (default).
* `/hide` hides the HUD.
* `/enable` allows script to modify context (default).
* `/disable` disables context modification and hide HUD.
* `/reset` wipes all set commands and saved context data.
* `/debug` toggles debugging mode which outputs modified context to HUD.


### Removing Context / Deleting Set Params

To clear any set value simply enter the command without passing an argument.

For example,typing `/name` in the input will clear the `name` variable.

To remove all set context variables use the `/reset` command.


### Commands: Author's Note

Each aspect of the Author's note can be modified independently to allow for swapping of a specific tag:

```
/note This is a story set in the World of A Song of Ice and Fire.
/title A Game of Thrones
/author George R. R. Martin.
/genre fantasy
/setting medieval
/theme brutal
/subject conspiracies, lies
/style dark, gritty, detailed
/rating M
```

Alternatively you could write an extended `/note` which would serve the same purpose:

```
/note 
```


### Commands: Character and Scene

Character and scene also have it's own set of commands.  Individually executed: 

```
/you Jon Snow
/at the Winterfell training yard
/with Robb Stark
/time early morning
/desc You and Robb have been training all morning.
```

Will get you the following output:

```
You are Jon Snow. You are at the Winterfell training yard with Robb Stark. It is early morning. You and Robb have been training all morning.
```

Of course you can always enter your own custom line using the `/desc` command:

```
/desc You are Jon Snow the Bastard of Winterfell. You are training in the early morning with your brother Robb Stark.
```

It is a good idea to reference World Info that you want to be drawn into the story here.  Having a key with `Robb Stark` and `Jon Snow` will flesh out the context and increase accuracy further.

### Commands: Focus

Focus is separate from the other two areas as it is pushed to the near front of the queue.  If no input is entered into the prompt the focus will take priority as if it was the last line entered.  Great for forcing the a scene to progress a certain way.

```
/focus You keep swinging in an attempt to get a hit on Robb.
```

### HUD Display

By running the above commands you would get a HUD output that looks like this: 

```
Author's Note: This is a story set in the World of A Song of Ice and Fire. Title: A Game of Thrones. Author: George R. R. Martin. Genre: fantasy. Setting: medieval. Theme: brutal. Subject: conspiracies, lies. Writing Style: dark, gritty, detailed. Rating: M.
You are Jon Snow. You are at the Winterfell training yard with Robb Stark. It is early morning. You and Robb have been training all morning.
You keep swinging in an attempt to get a hit on Robb.
```

## What's the point of all this?

The point of collecting all that data is to inject it into the context in a sensible way and hopefully coerce the AI into keeping to the "script" as it were.  This allows for an AI that doesn't forget important facts, people or motivations as often.

### Example of modified context

Assuming I had a World Info entry for `Robb Stark`, `Jon Snow` and `Winterfell` and the following `remember` set:

```
[ You are quiet and sullen. ]
[ You are baseborn. ]
```

My modified context would look like the this:

```
[ You are quiet and sullen. ]
[ You are baseborn. ]
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
Robb Stark:[WORLD_ENTRY_DETAILS_GO_HERE]
Jon Snow:[WORLD_ENTRY_DETAILS_GO_HERE]
[ Author's Note: This is a story set in the World of A Song of Ice and Fire. Title: A Game of Thrones. Author: George R. R. Martin. Genre: fantasy. Setting: medieval. Theme: brutal. Subject: conspiracies, lies. Writing Style: dark, gritty, detailed. Rating: M.]
[ You are Jon Snow. You are at the Winterfell training yard with Robb Stark. It is early morning. You and Robb have been training all morning.]
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
.. history ..
[ You keep swinging in an attempt to get a hit on Robb.]
.. latest input ..
```

This can all be verified by using the `/debug` special command which outputs the raw context instead of the HUD.