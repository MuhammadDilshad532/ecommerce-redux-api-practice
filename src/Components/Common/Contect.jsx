import MainLayout from "./MainLayout";
import { useState } from "react";
import ContactApi from "../../Api/Contact/Contact";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await ContactApi.SendMessage(formData);

      if (res.status === 201) {
        setMessage("Message sent successfully");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setMessage("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-2 rounded-md  font-medium border cursor-pointer"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {message && (
              <p className="text-center text-sm mt-2 ">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;