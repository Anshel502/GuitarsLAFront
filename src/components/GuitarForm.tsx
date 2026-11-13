import { useState } from "react";
import type { FormEvent } from "react";
import { createGuitar } from "../api/guitars";

type GuitarInput = {
  brand: string;
  name: string;
  image: string;
  description: string;
  price: string;
};

type GuitarFormProps = {
  onCreated: () => void;
};

type FormErrors = Partial<Record<keyof GuitarInput, string>>;

const IMAGES = Array.from({ length: 12 }, (_, i) => `guitarra_${String(i + 1).padStart(2, "0")}`);
const emptyForm: GuitarInput = { brand: "", name: "", image: "", description: "", price: "" };
const MAX_DESCRIPTION = 500;

export default function GuitarForm({ onCreated }: GuitarFormProps) {
  const [form, setForm] = useState<GuitarInput>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): FormErrors => {
    const found: FormErrors = {};

    if (!form.brand.trim()) found.brand = "La marca es obligatoria";
    else if (form.brand.trim().length > 50) found.brand = "Máximo 50 caracteres";

    if (!form.name.trim()) found.name = "El nombre es obligatorio";
    else if (form.name.trim().length > 50) found.name = "Máximo 50 caracteres";

    if (!form.image) found.image = "Selecciona una imagen";

    if (!form.description.trim()) found.description = "La descripción es obligatoria";
    else if (form.description.trim().length > 150)
      found.description = "La descripción no puede pasar de 150 caracteres";

    const price = Number(form.price);
    if (form.price.trim() === "") found.price = "El precio es obligatorio";
    else if (Number.isNaN(price)) found.price = "El precio debe un numero";
    else if (price <= 0) found.price = "El precio debe ser mayor a 0";
    
    return found;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      const created = await createGuitar({
        brand: form.brand.trim(),
        name: form.name.trim(),
        image: form.image,
        description: form.description.trim(),
        price: Number(form.price),
      });
      setSuccess(`¡Exito!"${created.name}" se registró en el catálogo correctamente`);
      setForm(emptyForm);
      onCreated();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Hubo un error inesperado al guardar.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (field: keyof GuitarInput) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;
  const selectClass = (field: keyof GuitarInput) =>
    `form-select ${errors[field] ? "is-invalid" : ""}`;
return (
    <section className="container-xl mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-dark text-white text-center py-4 rounded-top-4">
              <h2 className="mb-0 fs-3 fw-bold">Registrar Nueva Guitarra</h2>
            </div>
            
            <div className="card-body p-4 p-md-5 bg-light">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-4">
                  
                  {/* Marca */}
                  <div className="col-md-6">
                    <label htmlFor="brand" className="form-label fw-bold text-uppercase fs-6">Marca</label>
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      placeholder="Ej. Fender, Ibanez, PRS, etc."
                      className={inputClass("brand")}
                      value={form.brand}
                      onChange={handleChange}
                    />
                    {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
                  </div>

                  {/* Nombre */}
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-bold text-uppercase fs-6">Modelo</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Ej. Les Paul Standard 50s"
                      className={inputClass("name")}
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Precio */}
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label fw-bold text-uppercase fs-6">Precio</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white fw-bold">$</span>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Ingresa el precio de la guitarra"
                        className={inputClass("price")}
                        value={form.price}
                        onChange={handleChange}
                      />
                      {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>
                  </div>

                  {/* Imagen (Modificado: Se quitó el d-flex y la etiqueta img) */}
                  <div className="col-md-6">
                    <label htmlFor="image" className="form-label fw-bold text-uppercase fs-6">Fotografía</label>
                    <select
                      id="image"
                      name="image"
                      className={selectClass("image")}
                      value={form.image}
                      onChange={handleChange}
                    >
                      <option value="">Elige una fotografía</option>
                      {IMAGES.map((img) => (
                        <option key={img} value={img}>{img.replace('_', ' ').toUpperCase()}</option>
                      ))}
                    </select>
                    {errors.image && <div className="text-danger small mt-1">{errors.image}</div>}
                  </div>

                  {/* Descripción */}
                  <div className="col-12">
                    <label htmlFor="description" className="form-label fw-bold text-uppercase fs-6">Descripción Detallada</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="año, materiales, color, etc."
                      className={inputClass("description")}
                      value={form.description}
                      onChange={handleChange}
                    />
                    <div className="d-flex justify-content-between mt-1">
                      {errors.description ? (
                        <span className="text-danger small">{errors.description}</span>
                      ) : (
                        <span></span>
                      )}
                      <span className="text-muted small">
                        {form.description.length}/{MAX_DESCRIPTION}
                      </span>
                    </div>
                  </div>
                  
                  {/* Mensajes de Servidor */}
                  {serverError && (
                    <div className="col-12">
                      <div className="alert alert-danger mb-0">{serverError}</div>
                    </div>
                  )}
                  {success && (
                    <div className="col-12">
                      <div className="alert alert-success mb-0 fw-bold">{success}</div>
                    </div>
                  )}

                  {/* NUEVO: Vista Previa de la Imagen debajo del formulario */}
                  {form.image && (
                    <div className="col-12 text-center mt-4">
                      <p className="fw-bold text-uppercase fs-6 text-muted mb-2">Vista Previa</p>
                      <img 
                        src={`/img/${form.image}.jpg`} 
                        alt="Vista previa de la guitarra" 
                        className="img-thumbnail rounded shadow-sm"
                        style={{ maxWidth: "250px", height: "auto", objectFit: "cover" }} 
                      />
                    </div>
                  )}

                  {/* Botón Guardar */}
                  <div className="col-12 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-warning w-100 py-3 fs-5 fw-bold text-uppercase shadow-sm" 
                      disabled={saving}
                    >
                      {saving ? "Registrando en inventario espere" : "Guardar Guitarra"}
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
