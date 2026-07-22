import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../../styles/banner.css";

const BannerList = () => {
  const navigate = useNavigate();

const [banners, setBanners] = useState<any[]>([]);

const [loading, setLoading] = useState(true);
useEffect(() => {

  fetchBanners();

}, []);

const fetchBanners = async () => {

  try {

    const response = await fetch(
      `${API_URL}/api/admin/banners`
    );

    const data = await response.json();

    if (data.success) {

      setBanners(data.data);

    }

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};
  const toggleStatus = (id: number) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id
          ? { ...banner, status: !banner.status }
          : banner
      )
    );
  };

const deleteBanner = async (id: number) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this banner?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${API_URL}/api/admin/banners/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    alert("Banner deleted successfully.");

    // Refresh the list
    fetchBanners();

  } catch (error: any) {

    alert(error.message);

  }

};

  return (
    <div className="banner-page">

      <div className="page-header">

        <div>
          <h2>Hero Banners</h2>
          <p>Manage homepage hero banners.</p>
        </div>

        <button
          className="add-banner-btn"
          onClick={() => navigate("/admin/banners/add")}
        >
          <FaPlus />
          <span>Add Banner</span>
        </button>

      </div>

      <div className="banner-table-card">

        <div className="table-responsive">

          <table className="banner-table">

            <thead>

              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Button</th>
                <th>Sort</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {banners.map((banner) => (

                <tr key={banner.id}>

                  <td>

                   <img
                    src={`${API_URL}${banner.image_url}`}
                    alt={banner.title}
                    className="banner-thumbnail"
                    />

                  </td>

                  <td>{banner.title}</td>

                  <td>{banner.subtitle}</td>

                  <td>{banner.button_text}</td>

                  <td>{banner.sort_order}</td>

                  <td>

                    <button
                      className={
                        banner.status
                          ? "status-btn active"
                          : "status-btn inactive"
                      }
                      onClick={() => toggleStatus(banner.id)}
                    >
                      {banner.status ? (
                        <>
                          <FaEye />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <FaEyeSlash />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>

                  </td>

                  <td>

                    <div className="action-buttons">

                      {/* <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/banners/edit/${banner.id}`)
                        }
                      >
                        <FaEdit />
                      </button> */}

                      <button
                        className="delete-btn"
                        onClick={() => deleteBanner(banner.id)}
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default BannerList;