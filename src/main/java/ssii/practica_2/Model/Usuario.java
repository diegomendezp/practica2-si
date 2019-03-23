package ssii.practica_2.Model;

import java.util.List;
import java.util.Set;

import javax.persistence.*;


import javax.persistence.*;

@Entity
public class Usuario {
	private int id;
	private String nombre;
	private String apellidos;
	private String mail;
	private String contraseña;
	
	@ManyToMany
    private Set<Role> roles;	
	private String fecha_nacimiento;
    
	private String ciudad_residencia;
	private List<Servicio> servicios;
	
	public Usuario() {
	};
	
	public Usuario(String nombre, String apellidos, String mail, String contraseña, String fecha_nacimiento, String ciudad) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.mail = mail;
		this.contraseña = contraseña;
		this.fecha_nacimiento = fecha_nacimiento;
		this.ciudad_residencia = ciudad;
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

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}

//	public String getPerfil() {
//		return perfil;
//	}
//
//	public void setPerfil(String perfil) {
//		this.perfil = perfil;
//	}

	public String getFecha_nacimiento() {
		return fecha_nacimiento;
	}

	public void setFecha_nacimiento(String fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	}

	public String getCiudad_residencia() {
		return ciudad_residencia;
	}

	public void setCiudad_residencia(String ciudad_residencia) {
		this.ciudad_residencia = ciudad_residencia;
	}
	
	@OneToMany(mappedBy = "profesional")
	public List<Servicio> getServicios() {
		return servicios;
	}

	public void setServicios(List<Servicio> servicios) {
		this.servicios = servicios;
	}
	 public Set<Role> getRoles() {
	        return roles;
	    }

	  public void setRoles(Set<Role> roles) {
	        this.roles = roles;
	  }

	
	
	
	
}
