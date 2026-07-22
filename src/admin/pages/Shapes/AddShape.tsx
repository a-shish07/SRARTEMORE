import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/shape.css";

const API_URL = import.meta.env.VITE_API_URL;

const AddShape = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setError("");
    setSuccess("");

    if (!name) {
      setError("Shape name is required.");
      return;
    }

    try {
      setLoading(true);
      let imageId: number | null = null;

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

        imageId = uploadResult.image.id;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append(
        "status",
        status.toString()
      );

      if (imageId) {
        formData.append(
          "image_id",
          imageId.toString()
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/shapes`,
        {
          method: "POST",
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
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <h2>Add Shape</h2>
          <p>Create a new product shape.</p>
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
            placeholder="Enter Shape Name"
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
            <option value="true">
              Active
            </option>
            <option value="false">
              Inactive
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Shape Image</label>
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
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Shape"}
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

export default AddShape;