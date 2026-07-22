import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/size.css";

const API_URL = import.meta.env.VITE_API_URL;

const AddSize = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/sizes`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Size created successfully.");

        navigate("/admin/sizes");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to create size.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size-form-page">
      <div className="form-header">
        <h2>Add Size</h2>
        <p>Create a new product size.</p>
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
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Size"}
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

export default AddSize;