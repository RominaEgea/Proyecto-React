import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { uploadImage } from "../utils/uploadImage";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const emptyForm = { name: "", description: "", price: "", category: "", stock: "", tag: "" };

export const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "productos"));
      setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    setEditing(null);
    setFormError("");
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      category: product.category || "",
      stock: product.stock ?? "",
      tag: product.tag || "",
    });
    setExistingImageUrl(product.image || null);
    setImageFile(null);
    setImagePreview(null);
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validate = () => {
    if (!form.name.trim()) return "El nombre es obligatorio.";
    if (!form.price || Number(form.price) <= 0) return "El precio debe ser mayor a 0.";
    if (!editing && !imageFile) return "Tenés que seleccionar una imagen para el producto.";
    if (form.stock !== "" && Number(form.stock) < 0) return "El stock no puede ser negativo.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      let imageUrl = existingImageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        image: imageUrl,
        ...(form.category.trim() && { category: form.category.trim() }),
        ...(form.stock !== "" && { stock: Number(form.stock) }),
        ...(form.tag.trim() && { tag: form.tag.trim() }),
      };

      if (editing) {
        await updateDoc(doc(db, "productos", editing), payload);
      } else {
        await addDoc(collection(db, "productos"), payload);
      }

      resetForm();
      await fetchProducts();
    } catch (err) {
      setFormError(err.message || "Ocurrió un error al guardar el producto.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "productos", deleteModal));
      setDeleteModal(null);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin">
      <div className="admin__topbar">
        <h1 className="admin__title">Panel de administración</h1>
        <div className="admin__user">
          <span>{user?.email}</span>
          <button className="admin__logout" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      <div className="admin__form-section">
        <h2>{editing ? "Editar producto" : "Agregar producto"}</h2>

        {formError && <p className="admin__form-error">{formError}</p>}

        <form className="admin__form" onSubmit={handleSubmit}>
          <div className="admin__form-row">
            <label>
              Nombre *
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Precio *
              <input name="price" type="number" min="0" step="1" value={form.price} onChange={handleChange} required />
            </label>
          </div>

          <div className="admin__form-row">
            <label>
              Categoría
              <input name="category" value={form.category} onChange={handleChange} placeholder="Ej: Vestidos" />
            </label>
            <label>
              Stock
              <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} placeholder="Ej: 12" />
            </label>
            <label>
              Etiqueta
              <input name="tag" value={form.tag} onChange={handleChange} placeholder="Ej: Nuevo" />
            </label>
          </div>

          <label>
            Descripción
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
          </label>

          <label className="admin__file-label">
            Imagen del producto {!editing && "*"}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {(imagePreview || existingImageUrl) && (
            <div className="admin__image-preview">
              <img src={imagePreview || existingImageUrl} alt="Vista previa" />
              <span>{imageFile ? "Nueva imagen seleccionada" : "Imagen actual"}</span>
            </div>
          )}

          <div className="admin__form-actions">
            <button type="submit" className="admin__btn admin__btn--primary" disabled={saving}>
              {saving ? "Guardando…" : editing ? "Actualizar producto" : "Agregar producto"}
            </button>
            {editing && (
              <button type="button" className="admin__btn admin__btn--secondary" onClick={resetForm}>
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin__list-section">
        <h2>Catálogo ({products.length})</h2>

        {loading && (
          <div className="item-list__state">
            <div className="item-list__spinner" />
            <p>Cargando productos…</p>
          </div>
        )}

        {error && <p className="admin__form-error">⚠ {error}</p>}

        {!loading && !error && (
          <div className="admin__table-wrapper">
            <table className="admin__table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td data-label="">
                      <img src={p.image} alt={p.name} className="admin__thumb" />
                    </td>
                    <td data-label="Nombre">{p.name}</td>
                    <td data-label="Categoría">{p.category || "—"}</td>
                    <td data-label="Precio">${Number(p.price).toLocaleString("es-AR")}</td>
                    <td data-label="Stock">{p.stock ?? "—"}</td>
                    <td data-label="" className="admin__actions">
                      <button className="admin__btn admin__btn--edit" onClick={() => handleEdit(p)}>Editar</button>
                      <button className="admin__btn admin__btn--delete" onClick={() => setDeleteModal(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteModal && (
        <div className="admin__modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
            <h3>¿Eliminar este producto?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="admin__modal-actions">
              <button className="admin__btn admin__btn--secondary" onClick={() => setDeleteModal(null)}>Cancelar</button>
              <button className="admin__btn admin__btn--delete" onClick={handleDelete}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
