/*
 USAGE:
 $(':radio').aspnet_radiobutton()
 ISSUE:
 when an asp.net radiobutton is in a repeater
 then the name attribute is generated (i.e. different for each radio)
 so all of the radio buttons can be checked.
 FACT:
 when an asp.net radiobutton name attribute is equal to the generated name and the radio is checked
 then in the code-behind the radiobutton Checked property will be true
 SOLUTION:
 1. set name attribute consistently so only one radio can be checked
 2. when radio is checked then set only its name attribute to its generated name so it can be used in code-behind
*/
(function($) {
$.fn.aspnet_radiobutton = function(group_name) {
    var $radios = this
    group_name = group_name || 'consistent'

    $radios.click(function() {
        check($(this))
    })

    function check($radio) {
        // consistently rename all name attributes in group
        $radios.attr('name', group_name)
    
        // set the newly checked radio's name attribute back to its generated name
        // so we can read its Checked property in code-behind
        $radio.attr('name', $radio.attr('data-group-name'))

    // fixes: since plugin renamed checked radio's name attribute on line above
    // then its name attribute will differ from others in group and two radios could be checked
        // clear checks
        $radios.removeAttr('checked')
        $radios.prop('checked', false)
        // check this radio
        $radio.attr('checked', 'checked')
        $radio.prop('checked', true)
    }

    // before renaming name attribute, store the generated name in another attribute (so we can get it later)
    $radios.each(function(i) {
        $(this).attr('data-group-name', $(this).attr('name'))
    })

    // consistently rename name attributes
    $radios.attr('name', group_name)

    var radio_is_checked = false

    // if a radio is already checked on load/postback then set its name attribute
    $radios.each(function(i) {
        if ($(this).prop('checked')) {
            $(this).click()
            radio_is_checked = true
        }
    })

    // if none of the radios are checked then check the first radio
    if (!radio_is_checked)
        $radios.first().click()
}
}(jQuery));
