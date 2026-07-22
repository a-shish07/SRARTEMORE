import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import "../../styles/shape.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Shape {
  id: number;
  name: string;
  slug: string;
  image_id: number | null;
  image_url: string;
  status: boolean;
  created_at: string;
}

const ShapeList = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadShapes();
  }, []);

  const loadShapes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/admin/shapes`
      );

      const data = await response.json();

      if (data.success) {
        setShapes(data.shapes || []);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to load shapes.");
    } finally {
      setLoading(false);
    }
  };

  const deleteShape = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shape?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/shapes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        loadShapes();
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to delete shape.");
    }
  };

  const filteredShapes = useMemo(() => {
    return shapes.filter((shape) => {
      const keyword = search.toLowerCase();

      return (
        shape.name.toLowerCase().includes(keyword) ||
        shape.slug.toLowerCase().includes(keyword)
      );
    });
  }, [search, shapes]);

  if (loading) {
    return (
      <div className="page-loading">
        Loading Shapes...
      </div>
    );
  }

  return (
    <div className="shape-page">
      <div className="page-header">
        <div>
          <h2>Shapes</h2>
          <p>Manage all product shapes.</p>
        </div>

        <Link
          to="/admin/shapes/add"
          className="add-btn"
        >
          <FaPlus />
          <span>Add Shape</span>
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
          placeholder="Search shape..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredShapes.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="empty"
                >
                  No shapes found.
                </td>
              </tr>
            ) : (
              filteredShapes.map((shape) => (
                <tr key={shape.id}>
                  <td>{shape.id}</td>
                  <td>
                    {shape.image_url ? (
                      <img
                        src={`${API_URL}${shape.image_url}`}
                        alt={shape.name}
                        className="table-image"
                      />
                    ) : (
                      <div className="no-image">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{shape.name}</td>
                  <td>{shape.slug}</td>
                  <td>
                    <span
                      className={
                        shape.status
                          ? "badge active"
                          : "badge inactive"
                      }
                    >
                      {shape.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {new Date(
                      shape.created_at
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/admin/shapes/edit/${shape.id}`}
                        className="edit-btn"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() => deleteShape(shape.id)}
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
        {filteredShapes.length === 0 ? (
          <div className="empty">
            No shapes found.
          </div>
        ) : (
          filteredShapes.map((shape) => (
            <div
              className="mobile-card"
              key={shape.id}
            >
              <div className="mobile-image">
                {shape.image_url ? (
                  <img
                    src={`${API_URL}${shape.image_url}`}
                    alt={shape.name}
                  />
                ) : (
                  <div className="no-image">
                    No Image
                  </div>
                )}
              </div>

              <div className="mobile-content">
                <h3>{shape.name}</h3>
                <p>
                  <strong>Slug:</strong> {shape.slug}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={
                      shape.status
                        ? "badge active"
                        : "badge inactive"
                    }
                  >
                    {shape.status ? " Active" : " Inactive"}
                  </span>
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(
                    shape.created_at
                  ).toLocaleDateString()}
                </p>

                <div className="card-actions">
                  <Link
                    to={`/admin/shapes/edit/${shape.id}`}
                    className="edit-btn"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteShape(shape.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShapeList;

