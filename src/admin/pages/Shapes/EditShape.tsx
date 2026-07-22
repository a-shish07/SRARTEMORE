import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/shape.css";

const API_URL = import.meta.env.VITE_API_URL;

const EditShape = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState(true);
  const [imageId, setImageId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadShape();
  }, []);

  const loadShape = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/shapes/${id}`
      );

      const data = await response.json();

      if (data.success) {
        const shape = data.shape;
        setName(shape.name);
        setSlug(shape.slug);
        setStatus(shape.status);
        setImageId(shape.image_id);
        setCurrentImage(shape.image_url);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to load shape.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
    );
  }, [name]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let uploadedImageId = imageId;

      if (image) {
        const uploadData = new FormData();
        uploadData.append("image", image);
        uploadData.append("folder", "shapes");

        const uploadResponse = await fetch(
          `${API_URL}/api/admin/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          throw new Error(uploadResult.message);
        }

        uploadedImageId = uploadResult.image.id;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append(
        "status",
        status.toString()
      );

      if (uploadedImageId !== null) {
        formData.append(
          "image_id",
          uploadedImageId.toString()
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/shapes/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setSuccess(result.message);

      setTimeout(() => {
        navigate("/admin/shapes");
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        Loading Shape...
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <h2>Edit Shape</h2>
          <p>Update shape information.</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Shape Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            value={slug}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status.toString()}
            onChange={(e) =>
              setStatus(
                e.target.value === "true"
              )
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current Image</label>
          {currentImage ? (
            <div className="image-preview">
              <img
                src={`${API_URL}${currentImage}`}
                alt={name}
              />
            </div>
          ) : (
            <p>No image available.</p>
          )}
        </div>

        <div className="form-group">
          <label>Change Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="image-preview">
            <img
              src={preview}
              alt="Preview"
            />
          </div>
        )}

        <div className="form-buttons">
          <button
            type="submit"
            className="save-btn"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Shape"}
          </button>
          <Link
            to="/admin/shapes"
            className="cancel-btn"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditShape;