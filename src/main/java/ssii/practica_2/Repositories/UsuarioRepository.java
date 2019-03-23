package ssii.practica_2.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import ssii.practica_2.Model.Usuario;;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	 Usuario findByMail(String email);
}