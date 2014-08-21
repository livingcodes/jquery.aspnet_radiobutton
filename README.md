jquery.aspnet_radiobutton
=========================

Fixes issues with ASP.NET RadioButton when it's in a Repeater


USAGE
=====
 $(':radio').aspnet_radiobutton()
ISSUE
=====
 When an asp.net RadioButton is in a Repeater
 then the name attribute is generated (i.e. different for each radio)
 so all of the radio buttons can be checked.
SOLUTION
========
 1. Set name attribute consistently so only one radio can be checked
 2. Problem with #1 is now the Checked property isn't set during postback in code-behind because the name attribute differs from the generated name. So to fix this when radio is checked then set only _its_ name attribute to its generated name. Now its Checked property can be used in code-behind.

NOTES
=====
 * When an asp.net radiobutton name attribute is equal to the generated name and the radio is checked
 then in the code-behind the radiobutton Checked property will be true
 * The consistent name attribute (name for all radios except the checked one) can be set using the first parameter
 * Plugin checks the first radio button if none are checked
