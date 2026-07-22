import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/banner.css";

const EditBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    sortOrder: 1,
    status: true,
  });

  useEffect(() => {
    if (id) {
      fetchBanner();
    }
  }, [id]);

  const fetchBanner = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/banners/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load banner."
        );
      }

      const banner = data.banner;

      setFormData({
        title: banner.title || "",
        subtitle: banner.subtitle || "",
        description: banner.description || "",
        buttonText: banner.button_text || "",
        buttonLink: banner.button_link || "",
        sortOrder: banner.sort_order || 1,
        status: banner.status,
      });

      setPreview(banner.image_url);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = preview || "";

      /* Upload New Image Only If Selected */
      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("image", imageFile);
        uploadForm.append("folder", "banners");

        const uploadResponse = await fetch(
          `${API_URL}/api/admin/upload`,
          {
            method: "POST",
            body: uploadForm,
          }
        );

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadData.message || "Image upload failed."
          );
        }

        imageUrl = uploadData.image_url;
      }

      /* Update Banner */
      const response = await fetch(
        `${API_URL}/api/admin/banners/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            image_url: imageUrl,
            button_text: formData.buttonText,
            button_link: formData.buttonLink,
            sort_order: Number(formData.sortOrder),
            status: formData.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update banner."
        );
      }

      alert("Banner updated successfully.");
      navigate("/admin/banners");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-box">
        Loading Banner...
      </div>
    );
  }

  return (
    <div className="banner-page">
      <div className="page-header">
        <div>
          <h2>Edit Hero Banner</h2>
          <p>Update your homepage banner information.</p>
        </div>
      </div>

      <form className="banner-form" onSubmit={handleSubmit}>
        {/* ================= IMAGE ================= */}
        <div className="form-card">
          <h3>Banner Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="Banner Preview" />
            ) : (
              <div className="preview-placeholder">
                No Image Selected
              </div>
            )}
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="form-card">
          <h3>Banner Details</h3>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Banner Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              placeholder="Enter Banner Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows={5}
              placeholder="Enter Banner Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="two-column">
            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                name="buttonText"
                placeholder="Shop Now"
                value={formData.buttonText}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Button Link</label>
              <input
                type="text"
                name="buttonLink"
                placeholder="/products"
                value={formData.buttonLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="two-column">
            <div className="form-group">
              <label>Sort Order</label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>Status</label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
                <span>Active Banner</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="submit-section">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/banners")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Banner"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBanner;