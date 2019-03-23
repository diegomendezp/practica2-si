package ssii.practica_2.Model;

import java.util.List;

import javax.persistence.*;

@Entity
public class Servicio {
	private int id;
	private String nombre;
	private String descripcion;
	private String categoria;
	private int horas;
	private Double precio;
	private Usuario profesional;
	private List<Solicitud> solicitudes;
	
	public Servicio() {
	};
	
	public Servicio(String nombre, String descripcion, String categoria, int horas, Double precio) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.categoria = categoria;
		this.horas = horas;
		this.precio = precio;
	}
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public int getHoras() {
		return horas;
	}

	public void setHoras(int horas) {
		this.horas = horas;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}
	
	@ManyToOne
	@JoinColumn(name="profesional_id")
	public Usuario getProfesional() {
		return profesional;
	}

	public void setProfesional(Usuario profesional) {
		this.profesional = profesional;
	}
	
	@OneToMany(mappedBy = "servicio")
	public List<Solicitud> getSolicitudes() {
		return solicitudes;
	}

	public void setSolicitudes(List<Solicitud> solicitudes) {
		this.solicitudes = solicitudes;
	}
	
	
}
