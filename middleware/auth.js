function auth(req, res, next) {
  const rapidAPISec = req.header("X-RapidAPI-Proxy-Secret");
  if (!rapidAPISec) return res.status(401).send({ error: "Access denied. All API calls should come from RapidAPI." });
  if (rapidAPISec === process.env.RAPIDAPI_SEC) {
    next();
  } else {
    res.status(400).send({ error: "Unauthenticated Access." });
  }
}

export default auth;
