package ssii.practica_2.Controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.c

import ssii.practica_2.Model.Servicio;
import ssii.practica_2.Repositories.ServiceRepository;


//@RestController
public class ServiceController {

	private ServiceRepository serviceRepository ;
			
    @RequestMapping(value = "/services", method = RequestMethod.GET, produces = "application/json")
    public Iterable<Servicio> services() {
    	
    	return serviceRepository.findAll();
    }
    
    @RequestMapping(value = "/services/new", method = RequestMethod.POST, produces = "application/json")
    public Servicio newService(@RequestBody Servicio service)  {
//    	String newName = service.getName();
//    	String newAuthor = service.getAuthor();
//    	String newDescription = service.getDescription();
//    	Double newPrice = service.getPrize();
//    	String newCategory = service.getCategory();
//    	Integer newDuration = service.getDuration();
//    	this.names.add(newName);
//    	this.authors.add(newAuthor);
//    	this.descriptions.add(newDescription);
//    	this.prices.add(newPrice);
//    	this.categories.add(newCategory);
//    	this.durations.add(newDuration);
//    	
    	return new Servicio();
    }
    
    @RequestMapping(value = "/services/{id}", method = RequestMethod.GET)
    public Servicio getService(@PathVariable("id") int id) {
    	return new Servicio();
    }
    
    @RequestMapping(value = "/services/{id}", method = RequestMethod.DELETE)
    public Servicio deleteService(@PathVariable("id") int id) {
    		return new Servicio();
//    		return new Servicio(id,name, author, description, price, category, duration,status);
    	
    }
    
}
