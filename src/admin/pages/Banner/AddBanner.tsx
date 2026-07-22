import { useState } from "react";
import "../../styles/banner.css";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();


const [image, setImage] = useState<File | null>(null);

const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    sortOrder: 1,
    status: true,
  });

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     setLoading(true);

//     const response = await fetch(
//       `${API_URL}/api/admin/banners`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: formData.title,
//           subtitle: formData.subtitle,
//           description: formData.description,

//           // Temporary image path
//           image_url: preview || "/uploads/banner.jpg",

//           button_text: formData.buttonText,
//           button_link: formData.buttonLink,
//           sort_order: Number(formData.sortOrder),
//           status: formData.status,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message);
//     }

//     alert("Banner created successfully.");

//     navigate("/admin/banners");

//   } catch (error: any) {
//     alert(error.message);
//   } finally {
//     setLoading(false);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!image) {
    alert("Please select a banner image.");
    return;
  }

  try {
    setLoading(true);

    const form = new FormData();

    form.append("image", image);
    form.append("title", formData.title);
    form.append("subtitle", formData.subtitle);
    form.append("description", formData.description);
    form.append("button_text", formData.buttonText);
    form.append("button_link", formData.buttonLink);
    form.append("sort_order", String(formData.sortOrder));
    form.append("status", String(formData.status));

    const response = await fetch(`${API_URL}/api/admin/banners`, {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    console.log("API Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    alert("Banner created successfully.");

    navigate("/admin/banners");

  } catch (error: any) {
    console.error(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) {
    return;
  }

  const file = e.target.files[0];

  setImage(file);

  setPreview(URL.createObjectURL(file));
};

// const handleImage = (
//   e: React.ChangeEvent<HTMLInputElement>
// ) => {

//   if (!e.target.files?.length) return;

//   const file = e.target.files[0];

//   setImage(file);

//   setPreview(URL.createObjectURL(file));

// };

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

  return (
    <div className="banner-page">

      <div className="page-header">

        <div>
          <h2>Add Hero Banner</h2>
          <p>Create a new banner for the homepage.</p>
        </div>

      </div>

      <form
        className="banner-form"
        onSubmit={handleSubmit}
      >

        {/* Image */}

        <div className="form-card">

          <h3>Banner Image</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <div className="image-preview">

            {preview ? (
              <img
                src={preview}
                alt="Preview"
              />
            ) : (
              <div className="preview-placeholder">
                Image Preview
              </div>
            )}

          </div>

        </div>

        {/* Banner Details */}

        <div className="form-card">

          <h3>Banner Details</h3>

          <div className="form-group">

            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter banner title"
              value={formData.title}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Subtitle</label>

            <input
              type="text"
              name="subtitle"
              placeholder="Enter subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              rows={5}
              placeholder="Banner description"
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

        <div className="submit-section">

          <button
  type="submit"
  className="save-btn"
  disabled={loading}
>
  {loading ? "Saving..." : "Save Banner"}
</button>
        </div>

      </form>

    </div>
  );
};

export default AddBanner;