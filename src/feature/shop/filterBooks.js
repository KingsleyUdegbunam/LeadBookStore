export function filterBooks(query, collection, genre, books) {
  const search = query.toLowerCase();

  return books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);

    const matchesCollection =
      !collection || book.collections.includes(collection.value);

    const matchesGenre = !genre || book.genre === genre.value;

    return matchesSearch && matchesCollection && matchesGenre;
  });
}
