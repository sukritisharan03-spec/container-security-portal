import { useEffect, useState } from "react";
import { endpoints } from "../services/api";

function Images() {
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(endpoints.images)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setTotal(data.total_images);
      });
  }, []);

  return (
    <div className="page">
      <h1>Container Images</h1>

      <h3>Total Images: {total}</h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image Tags</th>
            <th>Size (MB)</th>
          </tr>
        </thead>

        <tbody>
          {images.map((img) => (
            <tr key={img.id}>
              <td>{img.id}</td>

              <td>
                {img.tags.map((tag, index) => (
                  <div key={index}>{tag}</div>
                ))}
              </td>

              <td>
                {(img.size / 1024 / 1024).toFixed(2)} MB
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Images;