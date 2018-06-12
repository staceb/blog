---
title: Text Message Analysis
date: "2011-08-25T12:00:00.000Z"
---


Idea
My phone was getting cluttered, and this affects aspects such as loading times, and general system speed. So I decided to delete all my messages. But I didn’t want to lose them forever. So I wanted to store them, which then gave me the idea – text analysis to find out the most common words. It would make good practice and should have a fun output. Here goes.

To begin with…
I did some research on text-message backup Android applications and came across “SMS Backup”. I wouldn’t recommend this app – I will explain. So once the app was installed, I ran it and clicked “back up SMS” from the main menu. It gave me a stupid name for the file to remember but I saw it was a “.bak” file so that would make it easy. Plugged the phone into the laptop and searched the memory card for “*.bak”, there it was. On opening it in notepad I could see it looked a right mess.

nova_vers1-0-1,1314033236680,INBOX,2929,ENVIATS,2732,BORRADOR,0,FAILED,1,INBOX_ini,0#1a4)1#1a4)2#1a4)2#1a4)+447754******#1a4)11-24-2010  #1a4)null#1a4)1290642384870#1a4)Jane Dodson#k1ah4dc#Long film! I love you x#k1ah4dc#0#1a4)1#1a4)4#1a4)20#1a4)+447814******#1a4)11-25-2010  #1a4)null#1a4)1290676930055#1a4)Mum#k1ah4dc#Milk needed if you home before 5#k1ah4dc#0#1a4)1#1a4)5#1a4)21#1a4)My 3#1a4)11-25-2010  #1a4)null#1a4)1290678961827#1a4)My 3#k1ah4dc#Thanks for registering with My 3. Your web password is: ****** but you can change this by going to three.co.uk/my3 and clicking on My security.#k1ah4dc#0#1a4)1#1a4)6#1a4)21#1a4)My 3#1a4)11-25-2010  #1a4)null#1a4)1290678964013#1a4)My 3#k1ah4dc#Thanks for registering with My 3. Your web password is: ***** but you can change this by going to three.co.uk/my3 and clicking on My security.#k1ah4dc#0#1a4)1#1a4)7#1a4)16#1a4)+44785******2#1a4)11-25-2010  #1a4)null#1a4)1290702******#1a4)Kerri Louise-owens#k1ah4dc#Hey you. What are your plans for this weekend? Dog goes on nights on Sunday so we need to get out his weekend! x#k1ah4dc#0

Before doing any kind of code, I needed to understand its form. I just put new lines in a various points until it looked good, like this…

nova_vers1-0-1,1314033236680,INBOX,2929,ENVIATS,2732,BORRADOR,0,FAILED,1,INBOX_ini,0

#1a4)1
#1a4)2
#1a4)2
#1a4)+447754******
#1a4)11-24-2010
#1a4)null
#1a4)1290642384870
#1a4)Jane Dodson#k1ah4dc#Long film! I love you x#k1ah4dc#0

#1a4)1
#1a4)4
#1a4)20
#1a4)+447814******
#1a4)11-25-2010
#1a4)null
#1a4)1290676930055
#1a4)Mum#k1ah4dc#Milk needed if you home before 5#k1ah4dc#0

EDIT – Before I go on, at this point or near-abouts, I thought, this app sucks and I want to go back, try something else. So I opened the app, clicked restore messages and ERROR – no backup file exists! This is not true, as I did not remove the file, I copied. Also when I first did it the app managed to show me the data on the phone, now it won’t. All I did was unplug and plug it back in again.

By laying out like that we can start to assign lines with titles. The first half of the file is INBOX and following roughly halfway through the file – or at “INBOX_fi,ENVIATS_ini” – it becomes the OUTBOX. This is the first two messages this phone received to my phone. Not sure what the 1 or the null are referring too, as they remain as such throughout the document. My suspicion is the null could determine is the message contains media, as the application left all MMS messages on the phone.

In order – not including row 1 and 6 (null) – they are as follows: Message Number, Message Thread, From/To Number, Date, Timestamp, Message Content.

So now I wanted to convert this jumbled up data into something I am happier to see…

From .Bak to MySQL with PHP
To figure this one out I just used a bit of paper and wrote down what I need to do. At this point I should point out I made a copy of the .bak file, one called INBOX.bak and the other OUTBOX.bak, this way before entering it all into the database I can assign a suitable IN/OUT tag. I also removed the top line.

1. Prepare database

Created a database in the usual way, called the table texts and gave each of the columns suitable types to handle the data correctly. This took some trial and error.

2. Load the file

$textData = file_get_contents(“INBOX.bak”);

3. Split the data between each of the “#la4)”. This leaves an array of message parts.

$exData = explode(“#1a4)”, $textData);

4. Go through the $exData array and prepare for MySQL INSERT query

To do this I used a foreach loop with $exData as $part. Within the loop a switch statement acts on whether it is on line 1, 2, 3, 4, 5, 6, 7 or 8 – for example:

case 4:
$date = $part;
break;

When i gets to 8, I reset the i variable to 0 and perform the query. The query was as follows:

mysql_query(“INSERT INTO texts VALUES (”,’1′,’$msgNum’,’$thread’,’$fromTo’,’$date’,’in’,’$time’,’$message’)”);

Before I did this I did various tests using echo, just to check the data was being organised correctly and everything was in the right place – notice I have written “in” in the 7th input. The first input is the PRIMARY KEY which is automatically generated by the database.

5. When the file is ready, don’t worry about hitting refresh again and again, as the database will automatically drop duplicates – although you may want to be careful as I am using a local database. Now I have a database with all my messages, and if I click “sort by message number” column, I can see it all in order.

Cleaning the Data
Before doing any analysis, it’s probably best to get rid of the strange characters in the messages. I just selected the message and ID rows from the whole data base, did a string replace and updated the database. Like: $string = str_replace(“#k1ah4dc#”, “”, $string); That’s replacing #k1ah4dc# with “” – nowt.

Analysis
Here I selected all the messages from the database and concatenated a single “bigString” string. This string is then exploded into words and placed into an array called $text, deliminated by a space. Then foreach word – over 4 letters long, and not in the “excluded” array, is placed into an array called $words. This is done by using the $counts = array_count_values($words); function and followed by an array_multisort($counts); to get it all in order.

Once done, the $oount array now contains each word and its associated count, loop through the top 20 and echo out a bit of text to make it easy to read.

foreach ($count as $key => $value)
{
if ( $i <= 20 )
{
echo ‘Number of occurances: ‘.$value.’ of word: ‘.$key.”
n”;
$i++;
}
}

Results!
The results are below, I’m not going to put them online. I’m not going to do anything with the results either. I just enjoyed getting them. Probably says something about me – both the results and enjoying the process. Next I plan to recreate the Android messaging layout so I can continue to access all my old messages Open-mouthed smile

Over 4 Letters
Count: 434 Word: about
Count: 278 Word: there
Count: 252 Word: think
Count: 204 Word: going
Count: 184 Word: today
Count: 180 Word: would
Count: 176 Word: could
Count: 174 Word: where
Count: 164 Word: still
Count: 154 Word: tomorrow
Count: 154 Word: should
Count: 154 Word: thats
Count: 152 Word: tonight
Count: 144 Word: coming
Count: 140 Word: night
Count: 120 Word: though
Count: 110 Word: right
Count: 108 Word: doing
Count: 102 Word: round
Count: 100 Word: thanks

 

 

Over 6 letters
Count: 154 Word: tomorrow
Count: 152 Word: tonight
Count: 94 Word: evening
Count: 84 Word: getting
Count: 76 Word: watching
Count: 74 Word: thinking
Count: 72 Word: morning
Count: 70 Word: something
Count: 56 Word: facebook
Count: 54 Word: probably
Count: 52 Word: looking
Count: 52 Word: birthday
Count: 52 Word: christmas
Count: 50 Word: message
Count: 46 Word: anything
Count: 44 Word: thought
Count: 44 Word: lancaster
Count: 44 Word: heading
Count: 40 Word: finished
Count: 38 Word: everyone

 

Over 3 Letters
Count: 944 Word: love
Count: 638 Word: your
Count: 628 Word: just
Count: 530 Word: that
Count: 530 Word: have
Count: 506 Word: what
Count: 502 Word: will
Count: 434 Word: about
Count: 424 Word: baby
Count: 422 Word: with
Count: 370 Word: come
Count: 364 Word: woof
Count: 316 Word: want
Count: 312 Word: good
Count: 300 Word: when
Count: 294 Word: home
Count: 282 Word: yeah
Count: 278 Word: there
Count: 274 Word: this
Count: 272 Word: time

 

Over 5 letters
Count: 154 Word: tomorrow
Count: 154 Word: should
Count: 152 Word: tonight
Count: 144 Word: coming
Count: 120 Word: though
Count: 100 Word: thanks
Count: 94 Word: evening
Count: 94 Word: really
Count: 94 Word: sounds
Count: 84 Word: getting
Count: 76 Word: please
Count: 76 Word: watching
Count: 74 Word: thinking
Count: 72 Word: morning
Count: 70 Word: something
Count: 62 Word: having
Count: 58 Word: lovely
Count: 56 Word: campus
Count: 56 Word: london
Count: 56 Word: facebook

 

Questions and comments below!!!