import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("freud");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setAnalysis("");
  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5003/api/Dream",
      { text, mode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 🔥 DÜZELTME BURADA
    setAnalysis(res.data.analysis); // ✅ artık doğru
    setText("");
  } catch (err) {
    setError("Bir hata oluştu. Lütfen tekrar deneyin.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-[#fdfcf9] border border-[#ccc] rounded-2xl shadow-lg text-[#5e4b3c]">
      <h2 className="text-3xl font-bold text-center mb-6">Rüyanı Yaz</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <textarea
          required
          className="w-full h-40 p-4 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c7051] resize-none bg-white"
          placeholder="Gece rüyamda gördüğüm şeyler..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium mb-2">Analiz Modu</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-3 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c7051] bg-white"
          >
            <option value="freud">Freud (Bilinçaltı)</option>
            <option value="jung">Jung (Arketipler, Kolektif Bilinç)</option>
            <option value="default">Basit / Hızlı Analiz</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8c7051] text-white py-3 rounded-xl font-semibold hover:bg-[#745e45] transition disabled:opacity-60"
        >
          {loading ? "Analiz ediliyor..." : "Rüyayı Gönder"}
        </button>
      </form>

      {/* Başarılı analiz bildirimi */}
      {analysis && (
        <div className="mt-6 text-sm text-[#4e604c] bg-[#e3f6d8] border border-[#b2d8b2] rounded-lg py-2 px-3 text-center font-medium">
          Rüyan analiz edildi. Aşağıda sonucu görebilirsin.
        </div>
      )}

      {/* AI Analiz Kutusu */}
      {analysis && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-xl text-green-700 shadow relative">
          <h4 className="font-semibold mb-2">AI Analizi:</h4>
          <p className="whitespace-pre-line">{analysis}</p>
          <button
            onClick={() => navigator.clipboard.writeText(analysis)}
            className="absolute top-2 right-2 text-sm text-green-700 border border-green-400 px-2 py-1 rounded hover:bg-green-100 transition"
          >
            Kopyala
          </button>
        </div>
      )}

      {/* Hata mesajı */}
      {error && (
        <p className="mt-6 text-red-500 font-medium text-center">{error}</p>
      )}
    </div>
  );
}
