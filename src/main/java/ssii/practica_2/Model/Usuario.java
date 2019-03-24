package ssii.practica_2.Model;

import java.util.List;


import javax.persistence.*;




@Entity
public class Usuario {
	private int id;
	private String nombre;
	private String apellidos;
	private String email;
	private String contraseña;
	
    private Role perfil;	
	private String fecha_nacimiento;
    
	private String ciudad_residencia;
	private List<Servicio> servicios;
	private List<Solicitud> solicitudes;
	

	public Usuario() {
	};

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

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String password) {
		this.contraseña = password;
	}

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
	
	 @ManyToOne
	 @JoinColumn(name="perfil_id")
	 public Role getRole() {
	        return perfil;
	    }

	  public void setRole(Role perfil) {
	        this.perfil = perfil;
	  }

	@OneToMany(mappedBy = "cliente")
	public List<Solicitud> getSolicitudes() {
		return solicitudes;
	}

	public void setSolicitudes(List<Solicitud> solicitudes) {
		this.solicitudes = solicitudes;
	}
	

	
	
	
	
	
}
