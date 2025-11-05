export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: "Missing videoId parameter" });
  }

  try {
    const response = await fetch(
      `https://youtubetranscript.com/?server_vid2=${videoId}`
    );
    const text = await response.text();

    // Verificar si la respuesta contiene algo útil
    if (!text || text.includes("error") || text.includes("<!DOCTYPE html>")) {
      throw new Error("Transcript not available or invalid format.");
    }

    return res.status(200).json({ transcript: text });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return res.status(500).json({
      error: "Failed to fetch transcript",
      details: error.message,
    });
  }
}

