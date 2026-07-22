import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import "../../styles/size.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Size {
  id: number;
  name: string;
  status: boolean;
  created_at: string;
}

const SizeList = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSizes();
  }, []);

  const loadSizes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/sizes`
      );

      const data = await response.json();

      if (data.success) {
        setSizes(data.sizes || []);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to load sizes.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSize = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this size?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/sizes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        loadSizes();
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to delete size.");
    }
  };

  const filteredSizes = useMemo(() => {
    return sizes.filter((size) =>
      size.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, sizes]);

  if (loading) {
    return (
      <div className="page-loading">
        Loading Sizes...
      </div>
    );
  }

  return (
    <div className="shape-page">
      <div className="page-header">
        <div>
          <h2>Sizes</h2>
          <p>Manage all product sizes.</p>
        </div>

        <Link
          to="/admin/sizes/add"
          className="add-btn"
        >
          <FaPlus />
          <span>Add Size</span>
        </Link>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search size..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSizes.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="empty"
                >
                  No sizes found.
                </td>
              </tr>
            ) : (
              filteredSizes.map((size) => (
                <tr key={size.id}>
                  <td>{size.id}</td>

                  <td>{size.name}</td>

                  <td>
                    <span
                      className={
                        size.status
                          ? "badge active"
                          : "badge inactive"
                      }
                    >
                      {size.status
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      size.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/admin/sizes/edit/${size.id}`}
                        className="edit-btn"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteSize(size.id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mobile-cards">
        {filteredSizes.map((size) => (
          <div
            className="mobile-card"
            key={size.id}
          >
            <div className="mobile-content">
              <h3>{size.name}</h3>

              <p>
                <strong>Status:</strong>

                <span
                  className={
                    size.status
                      ? "badge active"
                      : "badge inactive"
                  }
                >
                  {size.status
                    ? " Active"
                    : " Inactive"}
                </span>
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(
                  size.created_at
                ).toLocaleDateString()}
              </p>

              <div className="card-actions">
                <Link
                  to={`/admin/sizes/edit/${size.id}`}
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteSize(size.id)
                  }
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeList; 