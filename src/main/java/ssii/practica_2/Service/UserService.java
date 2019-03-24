package ssii.practica_2.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ssii.practica_2.Model.Role;
import ssii.practica_2.Model.Usuario;
import ssii.practica_2.Repositories.RoleRepository;
import ssii.practica_2.Repositories.UsuarioRepository;

import java.util.HashSet;

@Service
public class UserService{
    @Autowired
    private UsuarioRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void save(Usuario user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    	user.setPassword(user.getPassword());
        user.setRole(roleRepository.findByName("CUSTOMER"));
        userRepository.save(user);
    }

    public Usuario findByUsername(String mail) {
        return userRepository.findByEmail(mail);
    }
}
