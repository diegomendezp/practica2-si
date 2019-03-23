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


@RestController
public class ServiceController {

//    private final AtomicLong counter = new AtomicLong();
//    private ArrayList<String> authors =  new ArrayList<String>(Arrays.asList("Nathanial Storey","Rosendo Barlow","Erin Duggins","Lilly Fouch","Tashina Creek","Chantelle Moll","Shaquana Marple","Lupe Fournier","Hobert Delvalle","Porfirio Caruthers"));
//    private ArrayList<String> names =  new ArrayList<String>(Arrays.asList("Reparación Dispositivos","Instalación de software","Diseño de interfaz", "Reparación Dispositivos","Instalación de software","Reparación Dispositivos","Instalación de software","Reparación Dispositivos","Instalación de software","Reparación Dispositivos"));
//    private ArrayList<String> descriptions =  new ArrayList<String>(Arrays.asList("Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry","Lorem Ipsum is simply dummy text of the printing and typesetting industry"));
//    private ArrayList<Double> prices =  new ArrayList<Double>(Arrays.asList(10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0,10.0));
//    private ArrayList<Integer> durations =  new ArrayList<Integer>(Arrays.asList(50,107,6,67,5,58,10,10,15,220));
//    private ArrayList<String> categories =  new ArrayList<String>(Arrays.asList("Informática","Electronica","Programacion","Diseño","Informática","Informática","Informática","Informática","Informática","Informática"));
//    private ArrayList<String> status =  new ArrayList<String>(Arrays.asList("Aceptada","Rechazada","Pendiente","No respondida","No respondida","Rechazada","Pendiente","Pendiente","Aceptada","No respondida"));

   
   
    
    @RequestMapping(value = "/services", method = RequestMethod.GET, produces = "application/json")
    public List<Servicio> services() {
    	Servicio s ;
    	ArrayList<Servicio> list = new ArrayList<Servicio>();
    	
    	return list;
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
