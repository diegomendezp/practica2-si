package ssii.practica_2.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ssii.practica_2.Model.Servicio;


@RepositoryRestResource(collectionResourceRel = "servicios", path = "servicios")
public interface ServiceRepository extends CrudRepository<Servicio, Integer> {

    // El siguiente método aparece al acceder a http://localhost:8080/servicios/search

    // Declaración de método para buscar servicios por título.
    List<Servicio> findByNombre(@Param("nombre") String nombre);

}