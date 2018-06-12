---
title: I am a Programmer (or Developer)
date: "2014-06-24T12:00:00.000Z"
---

Good how!

A frequent question arises when I talk about my work, and that is:

> what exactly is it that you do?

Lets start off slow. I am a programmer, otherwise known as a developer. This
essentially means I develop programs to make computers to do things.

I’ll get on to day-to-day examples of what I do at work later, but for now let me introduce you to some code.

# Some Code

Here is some code which is about as basic as you can get, with some user input.

```
public class Hello
{	 	
    public static void Main(string[] args)
    {
        if (args.Length > 0)
        {
            System.Console.WriteLine("Hello, " + args[0] + "!");
        }
        else
        {
            System.Console.WriteLine("Hello, World!");
        }
    }
}
```

At the top the class is defined. A class is used to define some feature. It
could be an abstraction of a real world object – a shopping basket, or something
which maintains a connection to a database. In this case, the Hello class is in
fact our entire program!

Next comes the method `Main`. This is the entry point of this program. It’s the
first thing which happens. All that is going on here, is we are saying to the
computer: *“I want you to start here, with these arguments.”* Think of arguments
as settings. Changing any arguments will change how the program behaves, without
changing the code itself.

Now onto your first logical operation! Thanks for coming so far, I’m sure you’re
really enjoying this. Here is an `if … else` statement. Inside the `if`
statement is our test: *“if there are more than 0 arguments then do this”*. The
`else` block **captures** anything which does not pass this test.

Our program outputs a message using `System.Console.Writeline`. Now you’ll need
to imagine some white text appearing in a black box. If you don’t know what I 
mean then go to Start > Run > Type `“cmd”` > Hit Enter. This is Command Prompt!

So I hope you can see what our program does now… If you were to run our program
with the argument *“Jane”*, it would spit out *“Hello, Jane!”*. And if no
arguments were specified then the program would say *“Hello, World!”*. How neat
is that!

# How Neat Is That?

I’m sure that you’ll all agree that is not the neatest thing you’ve seen up to this point in your life so far. But this really is the basis of most programming… That and loops – keep doing this until something happens, and this and that and the other thing until everyone is happy and we all go to bed and sleep happily ever after.

# What About Work, That Hasn’t Been Answered Yet…

Maybe it already has. And such is why the conversations around what I and others
as programmers often ends up a tricky subject – well I just sit around thinking
logically all day.

Here’s an incredibly rough breakdown of anything I might do during any given
working day:

Start developing a new feature
Fix any issues with an existing feature
Write tests – these are also in code – to prove a feature works as intended
Respond to queries from clients of data my system provides
Investigate an issue, this might involve reading logs, monitoring diagnostics – if you’ve made them! – and contacting 3rd parties for more information
You can never really know what is going to happen day to day. But most of the time – perhaps 75% of it – I am programming code in a program called Visual Studio. Microsoft develop Visual Studio – an Integrated Development Environment or IDE – to aid programmers in producing C# code – and any other .Net (dot net) supported language.

# Slow Down… C# – Have We Moved Onto Music?

Not at all, this is a programming language. There are hundreds of programming languages – http://en.wikipedia.org/wiki/Comparison_of_programming_languages – and C# is just one of them. You might call C# the successor of C++ – which succeeded C. However you would be wrong to think that new languages are better or worse. In fact, until Apple unveiled Swift their apps were written in Objective-C which was first developed in 1981 – nearly 20 years before C#!

Apart from the fact that C# is developed by Microsoft who are Apple’s arch rivals, there are all sorts of reasons to choose various languages.

Here are some you might have heard of:

* C
* C#
* Java
* Javascript
* NodeJS – okay probably not this one…

# Lets See If I Can Wrap This Up

Given what you have read you can perhaps appreciate how conversation at a party
can get lost when building up a few of the simple core concepts. I rarely bring
up my profession without being asked and – if I can get away with it I attempt
to escape with “I just write code!”.

I am however pleasantly surprised on how often people lean a little closer and
are genuinely interested in what this line of work means. And I’ll always be
happy to divulge as much information to an unwitting dinner party guest is
willing to succumb to.

As it is a hobby as well as a profession, I do a lot of coding at home too. Head
over to my projects page to see what kind of things I get up to. They are all my
ideas and mostly things I’ve knocked up in a day – the gifs one was a half hour
special – and there are plenty more ideas where they came from!

Thanks for reading so far, I appreciate any discussion, comments and feedback.

Matt