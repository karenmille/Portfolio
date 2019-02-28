function id(ID){
	return document.getElementById(ID);
}
      
//Character count for textarea
function textAmount(textField, textCount, textNum) {
	if (textField.value.length > textNum) {
		textField.value = textField.value.substring(0, textNum);
	} else {
		textCount.value = textNum - textField.value.length;
	}
}

//Validate form
function validateForm(form){
	var result = true;
	
	//validate form fields
	result &= validatefName();
	result &= validatelName();
	result &= validateEmail();
	//result &= validatePassword();
	result &= validateComment();
	
	//return validation result
	return result != 0;
}

function validatefName(){
	//remove existing error message
	var err = id('error-fname');
	if(err)err.remove();
	return validation('fname', 'This field is required');
}
function validatelName(){
	//remove existing error message
	var err = id('error-lname');
	if(err)err.remove();
	return validation('lname', 'This field is required');
}

function validateComment(){
	//remove existing error message
	var err = id('error-comment');
	if(err)err.remove();
	return validationComment('comment', 'This field is required');
}

// Validates email
function validateEmail() {
    // Remove existing error messages
    var err = id('error-email');
    if (err) err.remove();
    
    // User has entered something, required validation is successful
    if (validation('email', 'Email is required')) {

        // Regular expression to validate email
        // <Copied from internet>
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var email = id('email').value;

        // Test if email mathces regex
        if (!reg.test(email))  {
            // Show error message
            createErrorMessage('email', 'Please enter valid email');
            return false;
        }

        return true;
    }
    return false;
}

//Create and attached error message to parent element
function createErrorMessage(item, msg){
	var div = document.createElement('div');
	div.classList.add('error');
	div.id = 'error-' + item;
	div.appendChild(document.createTextNode(msg));
	id(item).parentElement.appendChild(div);
 
}

// Performs a required value validation on given element e and displays message msg
// if validation failed.
function validation(e, msg){
	var element = id(e);
	if(element.value.length == 0 ){
		createErrorMessage(e, msg);
		return false
	}
	return true;
}
// Performs a required value validation on given element e and displays message msg
// if validation failed.
function validationComment(e, msg){
	var element = id(e);
	if(element.value.length == 0 ){
		createErrorMessage(e, msg);
		return false
	}
	return true;
}

function validatePassword(password){

	var passwordStrength = id('passwordStrength');
	
	if (password.length == 0 || password.value == '') {
      passwordStrength.innerHTML = "";
      alert('Please enter a password');
      return false;
  }
 
    //Regular Expressions.
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.

    var passed = 0;

    //Validate for each Regular Expression.
    for (var i = 0; i < regex.length; i++) {
        if (new RegExp(regex[i]).test(password)) {
            passed++;
        }
    }

    //Validate for length of Password.
    if (passed > 2 && password.length > 8) {
        passed++;
    }
    
    if(passed == 0 || passed == 1){
      passwordStrength.innerHTML = "weak";
    }
    
    if(passed == 2 || passed == 3){
      passwordStrength.innerHTML = "Good";
    }
    
    if(passed == 4 || passed == 5){
      passwordStrength.innerHTML = "Strong";
    }
    
    if(passed == 6){
      passwordStrength.innerHTML = "Very Strong";
    }

}























