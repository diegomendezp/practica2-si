package ssii.practica_2.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ssii.practica_2.Model.Usuario;
import ssii.practica_2.Repositories.UsuarioRepository;


@RestController
@RequestMapping(value="/users") 
public class AuthController {
	@Autowired 
	private UsuarioRepository userRepository;

	@RequestMapping(value="/login") 
	public @ResponseBody String addNewUser (@RequestParam String name
			, @RequestParam String email) {
			Usuario n = new Usuario();
//			n.setName(name);
//			n.setEmail(email);
//			userRepository.save(n);
			return "Saved";
	}

	@RequestMapping(value="/all")
	public @ResponseBody Iterable<Usuario> getAllUsers() {
		return userRepository.findAll();
	}
}
