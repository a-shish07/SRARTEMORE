import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/size.css";

const API_URL = import.meta.env.VITE_API_URL;

const EditSize = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSize();
  }, []);

  const loadSize = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/sizes/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setName(data.size.name);
        setStatus(data.size.status);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to load size.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Size name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/admin/sizes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Size updated successfully.");

        navigate("/admin/sizes");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to update size.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        Loading Size...
      </div>
    );
  }

  return (
    <div className="size-form-page">
      <div className="form-header">
        <h2>Edit Size</h2>
        <p>Update product size.</p>
      </div>

      <form
        className="size-form"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label>Size Name</label>

          <input
            type="text"
            placeholder="Enter size name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={status ? "true" : "false"}
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

        <div className="form-actions">
          <button
            type="submit"
            className="save-btn"
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Size"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/admin/sizes")
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSize; 