package ssii.practica_2.Controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import ssii.practica_2.UserValidator;
import ssii.practica_2.Model.Usuario;
import ssii.practica_2.Repositories.UsuarioRepository;
import ssii.practica_2.Service.SecurityService;
import ssii.practica_2.Service.UserService;

@Controller
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private UsuarioRepository userRepository;
    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @RequestMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new Usuario());

        return "registration";
    }

    @RequestMapping(value = "/registration" , method = RequestMethod.POST)
    public String registration(@ModelAttribute("userForm") Usuario userForm, BindingResult bindingResult) {
        userValidator.validate(userForm, bindingResult);
        if (bindingResult.hasErrors()) {
            return "registration";
        }
        System.out.println("success");
        userService.save(userForm);

        securityService.autoLogin(userForm.getEmail(), userForm.getContraseña());

        return "redirect:/";
    }

    @RequestMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");
        return "login";
    }
    
    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    @ResponseBody
    public Usuario currentUserName(Principal principal) {
    	try {
       return userRepository.findByEmail(principal.getName());
    	}catch(Exception e) {
    		System.out.println(e.getLocalizedMessage());
    	     return userRepository.findByEmail("nico@gmail.com");

    	}
    }

}
