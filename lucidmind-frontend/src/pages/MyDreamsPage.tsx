import { useEffect, useState } from "react";
import axios from "axios";

type Dream = {
  id: number;
  text: string;
  analysis: string;
  createdAt: string;
};

export default function MyDreamsPage() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5003/api/Dream/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDreams(res.data);
      } catch {
        setError("Rüyalar alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchDreams();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 text-[#5e4b3c]">
      <h2 className="text-3xl font-bold mb-8 text-center">Rüyalarım</h2>

      {loading && <p className="text-center text-gray-500">Yükleniyor...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {dreams.length === 0 && !loading && (
        <p className="text-center text-[#8c7051] font-medium">
          Henüz bir rüya yazmadın.
        </p>
      )}

      <ul className="space-y-6">
        {dreams.map((dream) => (
          <li
            key={dream.id}
            className="bg-[#fdfcf9] border border-[#ccc] rounded-xl p-5 shadow-md"
          >
            <p className="mb-2 whitespace-pre-line">
              <span className="font-semibold text-[#8c7051]">Rüya:</span>{" "}
              {dream.text}
            </p>
            <p className="mb-2 whitespace-pre-line">
              <span className="font-semibold text-[#8c7051]">AI Analizi:</span>{" "}
              {dream.analysis}
            </p>
            <p className="text-sm text-right text-gray-500 italic">
              {new Date(dream.createdAt).toLocaleString("tr-TR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
