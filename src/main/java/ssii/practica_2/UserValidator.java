package ssii.practica_2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import ssii.practica_2.Model.Usuario;
import ssii.practica_2.Service.UserService;

@Component
public class UserValidator implements Validator {
    @Autowired
    private UserService userService;

    @Override
    public boolean supports(Class<?> aClass) {
        return Usuario.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Usuario user = (Usuario) o;
	        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "NotEmpty");
	        if (user.getEmail().length() < 6 || user.getEmail().length() > 32) {
	            errors.rejectValue("username", "Size.userForm.mail");
	        }
	        if (userService.findByUsername(user.getEmail()) != null) {
	            errors.rejectValue("username", "Duplicate.userForm.mail");
	        }
	
	        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty");
	        if (user.getContraseña().length() < 8 || user.getContraseña().length() > 32) {
	            errors.rejectValue("password", "Size.userForm.password");
	        }    
	 }
}
