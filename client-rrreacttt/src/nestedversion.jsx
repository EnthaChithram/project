const Nestedversion = (comments, parentid = null) => {
  const nested = [];
  const root = comments.filter((comment) => comment.parentid === parentid);
  if (root.length === 0) {
    return [];
  }
  for (const comment of root) {
    const children = Nestedversion(comments, comment._id);
    nested.push({ ...comment, children });
  }
  return nested;
};

export default Nestedversion;
