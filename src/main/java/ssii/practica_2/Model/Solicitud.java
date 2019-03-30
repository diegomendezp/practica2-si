package ssii.practica_2.Model;


import javax.persistence.*;

@Entity
public class Solicitud {
	private int id;
	private Usuario cliente;
	private Servicio servicio;
	private String fecha_solicitud;
	private String fecha_servicio;
	private String direccion;
	private int importe;
	private String estado;
	private String descripcion_estado;
	
	public Solicitud() {
	}
	
	public Solicitud(Usuario cliente, Servicio servicio, String fecha_solicitud, String fecha_servicio, String direccion, int importe, String estado, String descripcion_estado) {
		this.cliente = cliente;
		this.servicio = servicio;
		this.fecha_solicitud = fecha_solicitud;
		this.fecha_servicio = fecha_servicio;
		this.direccion = direccion;
		this.importe = importe;
		this.estado = estado;
		this.descripcion_estado = descripcion_estado;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name="usuario_id")
	public Usuario getCliente() {
		return cliente;
	}

	public void setCliente(Usuario cliente) {
		this.cliente = cliente;
	}
	
	@ManyToOne
	@JoinColumn(name="servicio_id")
	public Servicio getServicio() {
		return servicio;
	}

	public void setServicio(Servicio servicio) {
		this.servicio = servicio;
	}

	public String getFecha_solicitud() {
		return fecha_solicitud;
	}

	public void setFecha_solicitud(String fecha_solicitud) {
		this.fecha_solicitud = fecha_solicitud;
	}

	public String getFecha_servicio() {
		return fecha_servicio;
	}

	public void setFecha_servicio(String fecha_servicio) {
		this.fecha_servicio = fecha_servicio;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public int getImporte() {
		return importe;
	}

	public void setImporte(int importe) {
		this.importe = importe;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getDescripcion_estado() {
		return descripcion_estado;
	}

	public void setDescripcion_estado(String descripcion_estado) {
		this.descripcion_estado = descripcion_estado;
	}
	
	
}
