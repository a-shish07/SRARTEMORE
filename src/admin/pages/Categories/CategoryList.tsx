import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/category.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Category {
  id: number;
  name: string;
  slug: string;
  image_id: number;
  image_url: string;
  status: boolean;
  created_at: string;
}

const CategoryList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // Fetch Categories
  // -----------------------------
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/categories`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load categories."
        );
      }

      setCategories(data.categories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // -----------------------------
  // Search
  // -----------------------------
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const value = search.toLowerCase();

      return (
        category.name.toLowerCase().includes(value) ||
        category.slug.toLowerCase().includes(value)
      );
    });
  }, [categories, search]);

  // -----------------------------
  // Delete Category
  // -----------------------------
  const deleteCategory = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Delete failed."
        );
      }

      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading) {
    return (
      <div className="category-page">
        <div className="loading-box">
          Loading Categories...
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Category Management</h2>
          <p>Manage all product categories.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigate("/admin/categories/add")}
        >
          + Add Category
        </button>
      </div>

      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {/* Desktop Table */}
      <div className="table-wrapper">
        <table className="category-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="no-data"
                >
                  No Categories Found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    {category.image_url ? (
                      <img
                        src={`${API_URL}${category.image_url}`}
                        alt={category.name}
                        className="table-image"
                      />
                    ) : (
                      <div className="no-image">
                        No Image
                      </div>
                    )}
                  </td>

                  <td>{category.name}</td>
                  <td>{category.slug}</td>

                  <td>
                    <span
                      className={
                        category.status
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {category.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      category.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() =>
                          navigate(
                            `/admin/categories/edit/${category.id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() =>
                          deleteCategory(category.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="mobile-category-list">
        {filteredCategories.length === 0 ? (
          <div className="no-data">
            No Categories Found
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              className="category-card"
              key={category.id}
            >
              {category.image_url ? (
                <img
                  src={`${API_URL}${category.image_url}`}
                  className="card-image"
                  alt={category.name}
                />
              ) : (
                <div className="card-image-placeholder">
                  No Image
                </div>
              )}

              <h3>{category.name}</h3>

              <p>
                <strong>Slug:</strong>{" "}
                {category.slug}
              </p>

              <p>
                <strong>Status:</strong>
                <span
                  className={
                    category.status
                      ? "status active"
                      : "status inactive"
                  }
                >
                  {category.status ? " Active" : " Inactive"}
                </span>
              </p>

              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() =>
                    navigate(
                      `/admin/categories/edit/${category.id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() =>
                    deleteCategory(category.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* End Mobile View */}

    </div>
  );
};

export default CategoryList;