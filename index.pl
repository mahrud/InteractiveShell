#!/usr/bin/perl

## Mike
## Greg
## Franziska Hinkelmann
## August 2010


use CGI qw( :standard );


print header, start_html( -title=>'TryM2', -script=>{-language=>'JavaScript',-src=>'m2.js'});


print start_multipart_form(-name=>'form1', -method =>"POST",
-onSubmit=>"return validate()", );

print "<table><tr> <td valign=top>";
print "Enter M2 command: <br>";
print textarea(-name=>'command', -rows=>'16', -columns=>50, -default=>'version');

print "<center>", submit('button_name','Submit'),"</center><br><br>";

print "</td><td>";

$command = param('command');
$button = param('button_name');

if ($button eq "Submit") {
  $ans = `ruby runner.rb "$command"`;
  print "Answer: $ans <br>";
  print "<br>";
}

print "</td></tr></table>";


print end_form;

